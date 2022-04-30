import express from "express";
import "express-async-errors";
import bodyParser from "body-parser";
import path from "path";
import fs from "fs";
import { DEFAULT_KEYSETS_DIR_PATH } from "shared/constants";
import { NotFoundError } from "server/errors/NotFoundError";
import { errorHandler } from "server/middlewares/errorHandler";
import { renderApp } from "server/renderApp";
import { keysetsController } from "server/controllers/keysetsController";
import { loggerMiddleware } from "server/middlewares/loggerMiddleware";
import { KEYSETS_PATH } from "shared/constants";
import { KeysetsFs } from "server/models/KeysetsFs";

const KEYSETS_DIR_PATH =
  process.env.KEYSETS_DIR_PATH || DEFAULT_KEYSETS_DIR_PATH;

if (!fs.existsSync(KEYSETS_DIR_PATH)) {
  console.error(
    process.env.KEYSETS_DIR_PATH
      ? `Directory "${KEYSETS_DIR_PATH}" does't exist`
      : `Trying to get keysets in default directory "${DEFAULT_KEYSETS_DIR_PATH}. Specify "KEYSETS_DIR_PATH" env variable with you keyset files`
  );

  process.exit(1);
}

const server = express()
  .disable("x-powered-by")
  .use(loggerMiddleware())
  .use(
    express.static(
      process.env.NODE_ENV === "production"
        ? // https://github.com/jaredpalmer/razzle/issues/389
          path.join(__dirname, "../build/public")
        : process.env.RAZZLE_PUBLIC_DIR!
    )
  )
  .use(bodyParser.json())
  .use("/api", [
    keysetsController({
      keysets: new KeysetsFs(KEYSETS_DIR_PATH),
      path: KEYSETS_PATH,
    }),
  ])
  .get("/*", (req: express.Request, res: express.Response) => {
    const { html = "", redirect = false } = renderApp(req, res);
    if (redirect) {
      res.redirect(redirect);
    } else {
      res.send(html);
    }
  })
  .all("*", (_req, _res) => {
    throw new NotFoundError();
  })
  .use(errorHandler());

export default server;
