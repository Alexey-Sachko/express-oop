import { Router, Request, Response, NextFunction } from "express";
import * as ErrorHandler from "../utils/ErrorHandler";

type FullHanler = (
  err: ErrorHandler.ExtendedError,
  req: Request,
  res: Response,
  next: NextFunction
) => void;

const handle404Error = (router: Router) => {
  router.use((req, res) => {
    ErrorHandler.notFoundError();
  });
};

const handleClientErrors = (router: Router) => {
  router.use(((err, req, res, next) => {
    ErrorHandler.clientError(err, res, next);
  }) as FullHanler);
};

const handleServerErrors = (router: Router) => {
  router.use(((err, req, res, next) => {
    ErrorHandler.serverError(err, res, next);
  }) as FullHanler);
};

// export default [handleServerErrors, handleClientErrors, handle404Error];
export default [handle404Error, handleClientErrors, handleServerErrors];
