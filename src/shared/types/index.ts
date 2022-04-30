import { Keyset } from "server/models/Keyset";
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

export type KeysetPayload = {
  context: string;
  name: string;
};
export type KeyPayload = Record<Lang, LangPayload> & {
  context: string;
  name: string;
};

export interface KeysetsService {
  list: string[];
  create(name: string, p?: KeysetType): Promise<KeysetType>;
  rename(name: string, newName: string): Promise<string>;
  delete(name: string): Promise<string>;
  update(p: KeysetPayload): Promise<KeysetType>;
  updateKeyset(name: string, p: KeysetType): Promise<KeysetType>;
  getKeyset(name: string): Promise<Keyset>;
}
