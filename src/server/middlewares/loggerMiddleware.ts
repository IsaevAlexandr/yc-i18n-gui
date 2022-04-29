import { RequestHandler } from "express";

export const loggerMiddleware = (): RequestHandler => (req, res, next) => {
  req.logger = {
    ...console,
    error: console.error.bind(console, "ERROR: "),
    info: console.error.bind(console, "INFO: "),
    log: console.error.bind(console, "LOG: "),
    warn: console.error.bind(console, "WARN: "),
  };
  next();
};
