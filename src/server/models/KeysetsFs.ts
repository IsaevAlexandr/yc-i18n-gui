import fs from "fs";
import path from "path";
import rimraf from "rimraf";
import { DEFAULT_KEYSET } from "shared/constants";
import {
  KeysetValue,
  KeysetsService,
  KeysetPayload,
  KeyPayload,
} from "shared/types";

import { Keyset } from "./Keyset";

export class KeysetsFs implements KeysetsService {
  private _dirNames: string[];
  constructor(private readonly _rootDir) {
    this._syncDirNames();
  }

  get list() {
    return this._dirNames.filter((f) => !f.startsWith("."));
  }

  private _syncDirNames = async () => {
    this._dirNames = fs.readdirSync(this._rootDir);
  };

  create = async (name: string, payload: KeysetValue = DEFAULT_KEYSET) => {
    const res = await this.updateKeyset(name, payload);

    return res;
  };

  deleteKey = async (name: string, key: string): Promise<boolean> => {
    new Keyset(this._pathToKeyset(name)).deleteKey(key);

    return true;
  };

  createKey = async (
    name: string,
    payload: KeyPayload
  ): Promise<KeysetValue> => {
    return new Keyset(this._pathToKeyset(name)).createKey(payload);
  };

  async updateKey(
    name: string,
    key: string,
    payload: KeyPayload
  ): Promise<KeysetValue> {
    return new Keyset(this._pathToKeyset(name)).updateKey({
      ...payload,
      name: key,
    });
  }

  getKeysetValue = async (name: string): Promise<KeysetValue> => {
    return new Keyset(this._pathToKeyset(name)).value;
  };

  rename = async (name: string, newName: string): Promise<string> => {
    const res = await new Promise<string>((res, rej) => {
      fs.rename(
        path.resolve(this._rootDir, name),
        path.resolve(this._rootDir, newName),
        (err) => {
          if (err) {
            rej(err);
          } else res(newName);
        }
      );
    });

    await this._syncDirNames();

    return res;
  };

  update = async ({ name, context }: KeysetPayload): Promise<KeysetValue> => {
    const keyset = new Keyset(this._pathToKeyset(name));

    keyset.update({ context });

    return keyset.value;
  };

  delete = async (name: string): Promise<string> => {
    const res = await new Promise<string>((res, rej) =>
      rimraf(path.resolve(this._rootDir, name), (err) => {
        if (err) rej(err);
        else res(name);
      })
    );

    await this._syncDirNames();

    return res;
  };

  getKeyset = async (name: string): Promise<KeysetValue> => {
    return new Keyset(this._pathToKeyset(name)).value;
  };

  updateKeyset = async (
    name: string,
    payload: KeysetValue
  ): Promise<KeysetValue> => {
    return new Keyset(this._pathToKeyset(name), payload).value;
  };

  private _pathToKeyset = (name: string): string => {
    return path.resolve(this._rootDir, name);
  };
}
