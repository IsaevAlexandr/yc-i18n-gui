import { CustomError } from "./CustomError";

export class ValidationError extends CustomError {
  statusCode = 400;

  constructor(private readonly _message: string | string[]) {
    super("Validation failed");

    Object.setPrototypeOf(this, ValidationError.prototype);
  }

  serializeError() {
    return Array.isArray(this._message)
      ? this._message.map((message) => ({ message }))
      : [{ message: this._message }];
  }
}
