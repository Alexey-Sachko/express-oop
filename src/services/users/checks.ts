import { Request, Response, NextFunction } from "express";
import { HTTP400Error } from "../../utils/httpErrors";

export const checkRefreshParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.query.token) {
    throw new HTTP400Error("missing token param");
  }
  next();
};
