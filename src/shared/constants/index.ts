import { KeyPayload } from "../types";

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

export const DEFAULT_KEY_PAYLOAD: KeyPayload = {
  context: "",
  ru: {
    value: "",
    allowedStatus: AllowedStatuses.REQUIRES_TRANSLATION,
  },
  en: {
    value: "",
    allowedStatus: AllowedStatuses.REQUIRES_TRANSLATION,
  },
  name: "",
};
