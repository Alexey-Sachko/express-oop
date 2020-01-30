import { Router, Request, Response, NextFunction } from "express";
import { HTTPClientError, HTTP404Error } from "../utils/httpErrors";

type ExtendedError = {
  status: number;
} & Error;

type ErrorHandler = (
  err: ExtendedError,
  req: Request,
  res: Response,
  next: NextFunction
) => void;

const handle404Error = (router: Router) => {
  router.use((req, res) => {
    throw new HTTP404Error("Method not found.");
  });
};

const handleClientErrors = (router: Router) => {
  router.use(((err, req, res, next) => {
    if (err instanceof HTTPClientError) {
      console.error(err);
      res.status(err.status).send(err.message);
    } else {
      next(err);
    }
  }) as ErrorHandler);
};

const handleServerErrors = (router: Router) => {
  router.use(((err, req, res, next) => {
    console.error(err);
    if (process.env.NODE_ENV === "production") {
      res.status(500).send("Internal Server Error");
    } else {
      res.status(500).send(err.stack);
    }
  }) as ErrorHandler);
};

export default [handle404Error, handleClientErrors, handleServerErrors];
