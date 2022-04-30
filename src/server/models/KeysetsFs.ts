import fs from "fs";
import { promisify } from "util";
import path from "path";
import rimraf from "rimraf";
import { DEFAULT_KEYSET } from "shared/constants";
import {
  KeysetType,
  Lang,
  LangFiles,
  KeysetsService,
  KeysetPayload,
} from "shared/types";
import { ValidationError } from "server/errors/ValidationError";
import { Keyset } from "./Keyset";

const writeFilePromise = promisify(fs.writeFile);
const readFilePromise = promisify(fs.readFile);

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

  create = async (name: string, payload: KeysetType = DEFAULT_KEYSET) => {
    const res = await this.updateKeyset(name, payload);

    return res;
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

  async update({ name, context }: KeysetPayload): Promise<KeysetType> {
    const keyset = (await this.getKeyset(name)).getData();

    keyset.keyset.context = context;

    const result = await this.updateKeyset(name, keyset);

    return result;
  }

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

  getKeyset = async (name: string): Promise<Keyset> => {
    const dir = path.resolve(this._rootDir, name);

    if (!fs.existsSync(dir)) {
      throw new ValidationError(`Directory: '${name}' does not exists`);
    }

    const [context, keyset, ...lang] = await Promise.all([
      readFilePromise(path.join(dir, "context.json")).then((s) =>
        JSON.parse(String(s))
      ),
      readFilePromise(path.join(dir, "keyset.json")).then((s) =>
        JSON.parse(String(s))
      ),
      ...Object.keys(Lang).map(
        (lang) =>
          new Promise((res) => {
            readFilePromise(path.join(dir, `${lang}.json`)).then((s) =>
              res([lang, JSON.parse(String(s))])
            );
          })
      ),
    ]);

    return new Keyset({
      context,
      keyset,
      ...lang.reduce<LangFiles>((acc, [lang, langVal]) => {
        acc[lang] = langVal;
        return acc;
      }, {} as LangFiles),
    });
  };

  updateKeyset = async (
    name: string,
    payload: KeysetType
  ): Promise<KeysetType> => {
    const dir = path.resolve(this._rootDir, name);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    await Promise.all([
      writeFilePromise(
        path.join(dir, "context.json"),
        this.serializeJson(payload.context)
      ),
      writeFilePromise(
        path.join(dir, "keyset.json"),
        this.serializeJson(payload.keyset)
      ),
      Object.keys(Lang).map((lang) =>
        writeFilePromise(
          path.join(dir, `${lang}.json`),
          this.serializeJson(payload[lang] || {})
        )
      ),
    ]);

    await this._syncDirNames();

    return payload;
  };

  private serializeJson = (data: unknown): string =>
    JSON.stringify(data, null, 4);
}
