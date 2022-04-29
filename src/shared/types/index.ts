import { AllowedStatuses } from "shared/constants";

export enum Lang {
  ru = "ru",
  en = "en",
}

export type KeysetStatus = Record<Lang, AllowedStatuses>;

export interface KeysetFile {
  context: string;
  allowedStatuses: AllowedStatuses[];
  status: Record<string, KeysetStatus>;
}
export interface ContextFile {
  [s: string]: string;
}

type LangFileValue = string[] | string;
export interface LangFile {
  [s: string]: LangFileValue;
}

export type LangFiles = Record<Lang, LangFile>;

export type KeysetType = Record<Lang, LangFile> & {
  context: ContextFile;
  keyset: KeysetFile;
};

export type LangPayload = {
  value: LangFileValue;
  allowedStatus: AllowedStatuses;
};

export type KeyPayload = Record<Lang, LangPayload> & {
  context: string;
  name: string;
};

// TODO: скорее всего стоит вынести в DTO
export type RenamePayload = { oldName: string; newName: string };

export type DeleteKeyDTO = {
  name: string;
};

export interface KeysetsService {
  list: string[];
  // TODO: ability to add context on creation
  create(name: string): Promise<KeysetType>;
  rename(name: string, newName: string): Promise<string>;
  delete(name: string): Promise<string>;
  update(name: string, p: KeysetType): Promise<KeysetType>;
  getValue(name: string): Promise<KeysetType>;
}
