import express, { Request } from "express";
import { Keyset } from "server/models/Keyset";

import { KeyPayload, KeysetsService } from "shared/types";

interface KeysetsControllerProps {
  keysets: KeysetsService;
  path: string;
}

export const keysetsController = ({
  keysets,
  path,
}: KeysetsControllerProps) => {
  const router = express.Router();

  // keyset list
  router.get(`/${path}`, async (_req, res) => {
    return res.send(keysets.list);
  });

  // create keyset
  router.post(
    `/${path}/:keyset`,
    async (req: Request<{ keyset: string }>, res) => {
      const { keyset } = req.params;

      res.send(await keysets.create(keyset));
    }
  );

  // TODO: support on client
  // edit keyset name
  router.put(
    `/${path}/:keyset`,
    async (req: Request<{ keyset: string }, {}, { newName: string }>, res) => {
      const { keyset } = req.params;
      const { newName } = req.body;

      return res.send(await keysets.rename(keyset, newName));
    }
  );

  // delete keyset
  router.delete(
    `/${path}/:keyset`,
    async (req: Request<{ keyset: string }>, res) => {
      const { keyset } = req.params;
      return res.send({ message: await keysets.delete(keyset) });
    }
  );

  // get keyset data
  router.get(
    `/${path}/:keyset`,
    async (req: Request<{ keyset: string }>, res) => {
      const result = await keysets.getValue(req.params.keyset);
      return res.send(result);
    }
  );

  // create keyset key
  router.post(
    `/${path}/:keyset/:key`,
    async (
      req: Request<{ keyset: string; key: string }, {}, KeyPayload>,
      res
    ) => {
      const keyset = new Keyset(await keysets.getValue(req.params.keyset));
      const result = keyset.createKey(req.body);
      await keysets.update(req.params.keyset, result);

      return res.send(result);
    }
  );

  // edit keyset key
  router.put(
    `/${path}/:keyset/:key`,
    async (
      req: Request<{ keyset: string; key: string }, {}, KeyPayload>,
      res
    ) => {
      const keyset = new Keyset(await keysets.getValue(req.params.keyset));
      const result = keyset.updateKey(req.params.key, req.body);
      await keysets.update(req.params.keyset, result);

      return res.send(result);
    }
  );

  // delete keyset key
  router.delete(
    `/${path}/:keyset/:key`,
    async (req: Request<{ keyset: string; key: string }>, res) => {
      const keyset = new Keyset(await keysets.getValue(req.params.keyset));
      const result = keyset.deleteKey(req.params.key);
      await keysets.update(req.params.keyset, result);

      return res.send(result);
    }
  );

  return router;
};
