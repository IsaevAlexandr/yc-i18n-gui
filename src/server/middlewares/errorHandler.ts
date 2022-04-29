import { Response, Request, NextFunction } from "express";
import { CustomError } from "../errors/CustomError";

export const errorHandler =
  () => (err: Error, req: Request, res: Response, next: NextFunction) => {
    req.logger.error(err.message, err);

    if (err instanceof CustomError) {
      res.status(err.statusCode).send({ message: err.serializeError() });
    } else {
      // TODO: we can better
      res.status(400).send({ message: String(err) });
    }
    next();
  };
