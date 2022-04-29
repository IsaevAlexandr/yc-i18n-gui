import { KeysetType, KeyPayload, LangPayload, Lang } from "shared/types";

export const adapter = ({
  context,
  keyset,
  ...langs
}: KeysetType): KeyPayload[] => {
  
  return Object.entries(keyset.status).map(([key, langStatuses]) => {
    return {
      name: key,
      context: context[key],
      ...Object.entries(langs).reduce((acc, [lang, keyValue]) => {
        acc[lang] = {};
        acc[lang].value = keyValue[key];
        acc[lang].allowedStatus = langStatuses[lang];

        return acc;
      }, {} as Record<Lang, LangPayload>),
    };
  });
};
