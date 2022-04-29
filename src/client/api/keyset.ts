import { KEYSETS_PATH } from "shared/constants";
import { DeleteKeyDTO, KeyPayload, KeysetType } from "shared/types";

const handleRequest = <T>(request: Promise<Response>): Promise<T> => {
  return request.then(async (res) => {
    const data = await res.json();

    if (res.ok) return data;

    throw data;
  });
};

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

export const editKey =
  (keyset: string) =>
  (payload: KeyPayload): Promise<KeysetType> => {
    return handleRequest(
      fetch(`/api/${KEYSETS_PATH}/${keyset}/${payload.name}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
    );
  };

export const deleteKey =
  (keyset: string) =>
  (payload: DeleteKeyDTO): Promise<KeysetType> => {
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
