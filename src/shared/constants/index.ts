import { KeyPayload, KeysetType, Lang, LangFiles, LangPayload } from "../types";

export enum AllowedStatuses {
  APPROVED = "APPROVED",
  EXPIRED = "EXPIRED",
  GENERATED = "GENERATED",
  REQUIRES_TRANSLATION = "REQUIRES_TRANSLATION",
  TRANSLATED = "TRANSLATED",
}

export const allowedStatuses = [
  AllowedStatuses.APPROVED,
  AllowedStatuses.EXPIRED,
  AllowedStatuses.GENERATED,
  AllowedStatuses.REQUIRES_TRANSLATION,
  AllowedStatuses.TRANSLATED,
];

export const KEYSETS_PATH = "keysets";

export const DEFAULT_KEYSETS_DIR_PATH = "src/i18n-keysets";

export const DEFAULT_KEYSET_KEY_PAYLOAD: KeyPayload = {
  context: "",
  name: "",
  ...Object.keys(Lang).reduce((acc, lang) => {
    acc[lang] = {
      value: "",
      allowedStatus: AllowedStatuses.REQUIRES_TRANSLATION,
    };

    return acc;
  }, {} as Record<Lang, LangPayload>),
};

export const DEFAULT_KEYSET: KeysetType = {
  context: {},
  keyset: {
    context: "",
    status: {},
    allowedStatuses,
  },
  ...Object.keys(Lang).reduce((acc, lang) => {
    acc[lang] = {};
    return acc;
  }, {} as LangFiles),
};
