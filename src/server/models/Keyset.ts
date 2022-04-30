import { ValidationError } from "server/errors/ValidationError";
import { AllowedStatuses } from "shared/constants";
import {
  Lang,
  KeysetType,
  KeyPayload,
  LangPayload,
  KeysetStatus,
} from "shared/types";

export class Keyset {
  constructor(private readonly _keyset: KeysetType) {}

  getData = () => {
    return this._keyset;
  };

  updateKey = ({ name, context, ...langs }: KeyPayload) => {
    this._keyset.context[name] = context;

    for (const key in langs) {
      const langPayload = langs[key] as LangPayload;

      if (langPayload.value) {
        this._keyset[key][name] = langPayload.value;
      }
      if (langPayload.allowedStatus) {
        this._keyset.keyset.status[name][key] = langPayload.allowedStatus;
      }
    }

    return this.getData();
  };

  createKey = ({ name, context, ...langs }: KeyPayload) => {
    if (this._keyset.keyset?.status?.[name]) {
      throw new ValidationError(`Key "${name}" already exists`);
    }

    this._keyset.context[name] = context || "";
    for (const lang in Lang) {
      this._keyset[lang][name] = langs?.[lang]?.value || "";
      if (!this._keyset.keyset.status[name]) {
        this._keyset.keyset.status[name] = {} as KeysetStatus;
      }

      this._keyset.keyset.status[name][lang] = langs?.[lang]?.allowedStatus;
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
}
