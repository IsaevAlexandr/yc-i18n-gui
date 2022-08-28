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

export type KeysetValue = LangFiles & {
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
  create(name: string, p?: KeysetValue): Promise<KeysetValue>;
  rename(name: string, newName: string): Promise<string>;
  delete(name: string): Promise<string>;
  update(p: KeysetPayload): Promise<KeysetValue>;
  getKeysetValue(name: string): Promise<KeysetValue>;
  updateKeyset(name: string, payload: KeysetValue): Promise<KeysetValue>;
  createKey(name: string, payload: KeyPayload): Promise<KeysetValue>;
  updateKey(
    name: string,
    key: string,
    payload: KeyPayload
  ): Promise<KeysetValue>;
  deleteKey(name: string, key: string): Promise<boolean>;
}

export interface KeysetBase {
  value: KeysetValue;
  update({ context: string }): KeysetValue;
  updateKey(payload: KeyPayload): KeysetValue;
  updateKeys(payload: KeyPayload[]): KeysetValue;
  createKey(payload: KeyPayload): KeysetValue;
  deleteKey(payload: string): KeysetValue;
}
