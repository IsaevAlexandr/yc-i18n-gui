import { KEYSETS_PATH } from "shared/constants";
import { KeyPayload, KeysetType } from "shared/types";
import { handleRequest } from "./utils";

export const getKeysetsList = (): Promise<string[]> => {
  return handleRequest(fetch(`/api/${KEYSETS_PATH}`, { method: "GET" }));
};

export const getKeyset = (name: string): Promise<KeysetType> => {
  return handleRequest(
    fetch(`/api/${KEYSETS_PATH}/${name}`, { method: "GET" })
  );
};

export const createKeyset = (name: string): Promise<KeysetType> => {
  return handleRequest(
    fetch(`/api/${KEYSETS_PATH}/${name}`, { method: "POST" })
  );
};
export const deleteKeyset = (name: string): Promise<KeysetType> => {
  return handleRequest(
    fetch(`/api/${KEYSETS_PATH}/${name}`, { method: "DELETE" })
  );
};

export interface KeyEditPayload {
  name: string;
  keyData: KeyPayload;
}

export const editKey =
  (keyset: string) =>
  ({ name, keyData }: KeyEditPayload): Promise<KeysetType> => {
    return handleRequest(
      fetch(`/api/${KEYSETS_PATH}/${keyset}/${name}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(keyData),
      })
    );
  };

export const deleteKey =
  (keyset: string) =>
  (payload: { name: string }): Promise<KeysetType> => {
    return handleRequest(
      fetch(`/api/${KEYSETS_PATH}/${keyset}/${payload.name}`, {
        method: "DELETE",
      })
    );
  };

export const createKey =
  (keyset: string) =>
  (payload: KeyPayload): Promise<KeysetType> => {
    return handleRequest(
      fetch(`/api/${KEYSETS_PATH}/${keyset}/${payload.name}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
    );
  };
