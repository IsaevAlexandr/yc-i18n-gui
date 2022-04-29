import { ValidationError } from "server/errors/ValidationError";
import { AllowedStatuses } from "shared/constants";
import {
  Lang,
  KeysetType,
  KeyPayload,
  LangPayload,
  KeysetStatus,
  RenamePayload,
} from "shared/types";

export class Keyset {
  constructor(private readonly _keyset: KeysetType) {}

  getData = () => {
    return this._keyset;
  };

  updateKey = (name: string, payload: KeyPayload) => {
    if (payload.name !== name) {
      this._renameKey({ oldName: name, newName: payload.name });
    }

    for (const key in payload) {
      if (key === "context") {
        this._keyset.context[name] = payload.context;
      } else {
        const langPayload = payload[key] as LangPayload;

        if (langPayload.value) {
          this._keyset[key][name] = langPayload.value;
        }
        if (langPayload.allowedStatus) {
          this._keyset.keyset.status[name][key] = langPayload.allowedStatus;
        }
      }
    }

    return this.getData();
  };

  createKey = (payload: KeyPayload) => {
    if (this._keyset.keyset?.status?.[payload.name]) {
      throw new ValidationError(`Key "${payload.name}" already exists`);
    }

    this._keyset.context[payload.name] = payload.context || "";
    for (const lang in Lang) {
      this._keyset[lang][payload.name] = payload?.[lang]?.value || "";
      if (!this._keyset.keyset.status[payload.name]) {
        this._keyset.keyset.status[payload.name] = {} as KeysetStatus;
      }

      this._keyset.keyset.status[payload.name][lang] =
        payload?.[lang]?.allowedStatus;
      AllowedStatuses.GENERATED;
    }

    return this.getData();
  };

  deleteKey = (name: string) => {
    if (!this._keyset.keyset.status[name]) {
      throw new ValidationError(`Key "${name}" does not exists`);
    }

    delete this._keyset.context[name];
    delete this._keyset.keyset.status[name];

    for (const lang in Lang) {
      delete this._keyset[lang][name];
    }

    return this.getData();
  };

  private _renameKey = ({ oldName, newName }: RenamePayload) => {
    if (!this._keyset.keyset.status[oldName]) {
      throw new ValidationError(`Where is no key "${oldName}" `);
    }

    this._keyset.context[newName] = this._keyset.context[oldName];
    delete this._keyset.context[oldName];

    this._keyset.keyset.status[newName] = this._keyset.keyset.status[oldName];
    delete this._keyset.keyset.status[oldName];

    for (const lang in Lang) {
      this._keyset[lang][newName] = this._keyset[lang][oldName];
      delete this._keyset[lang][oldName];
    }
  };
}
