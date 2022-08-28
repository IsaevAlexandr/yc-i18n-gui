import express, { Request } from "express";
import { KeyPayload, KeysetPayload, KeysetsService } from "shared/types";

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

      return res.send(await keysets.create(keyset));
    }
  );

  // TODO: support on client
  // edit keyset name
  router.put(
    `/${path}/:keyset`,
    async (req: Request<{ keyset: string }, {}, KeysetPayload>, res) => {
      const { keyset } = req.params;
      const payload = req.body;

      if (payload.name !== keyset) {
        await keysets.rename(keyset, payload.name);
      }

      const result = await keysets.update(payload);

      return res.send(result);
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
      return res.send(await keysets.getKeysetValue(req.params.keyset));
    }
  );

  // create keyset key
  router.post(
    `/${path}/:keyset/:key`,
    async (
      req: Request<{ keyset: string; key: string }, {}, KeyPayload>,
      res
    ) => {
      const keyset = await keysets.createKey(req.params.keyset, req.body);

      return res.send(keyset);
    }
  );

  // edit keyset key
  router.put(
    `/${path}/:keyset/:key`,
    async (
      req: Request<{ keyset: string; key: string }, {}, KeyPayload>,
      res
    ) => {
      const {
        params: { keyset, key },
        body,
      } = req;
      let data;
      // rename key
      if (req.params.key !== req.body.name) {
        data = keysets.createKey(keyset, body);
        keysets.deleteKey(keyset, key);
      } else {
        data = keysets.updateKey(keyset, key, body);
      }

      return res.send(data);
    }
  );

  // delete keyset key
  router.delete(
    `/${path}/:keyset/:key`,
    async (req: Request<{ keyset: string; key: string }>, res) => {
      const {
        params: { keyset, key },
      } = req;

      return res.send(await keysets.deleteKey(keyset, key));
    }
  );

  return router;
};
