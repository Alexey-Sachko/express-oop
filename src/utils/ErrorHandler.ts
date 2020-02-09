import { Response, NextFunction } from "express";
import {
  HTTPClientError,
  HTTP404Error,
  HTTP400Error
} from "../utils/httpErrors";

export const notFoundError = () => {
  throw new HTTP404Error("Method not found.");
};

export type ExtendedError = {
  statusCode: number;
} & Error;

export const clientError = (
  err: ExtendedError,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof HTTPClientError) {
    console.warn(err);
    res.status(err.statusCode).send({ error: err.message });
  } else {
    next(err);
  }
};

export const serverError = (err: Error, res: Response, next: NextFunction) => {
  console.error(err);
  if (process.env.NODE_ENV === "production") {
    res.status(500).send({ error: "Internal Server Error" });
  } else {
    res.status(500).send({ error: { message: err.message, stack: err.stack } });
  }
};
