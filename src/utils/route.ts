import { Request, Response, NextFunction } from "express";

type Methods =
  | "all"
  | "get"
  | "post"
  | "put"
  | "delete"
  | "patch"
  | "options"
  | "head";

type Handler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void> | void;

type _Route = {
  path: string;
  method: Methods;
  handler: Handler | Handler[];
};

export default class Route {
  path: string;
  method: Methods;
  handler: Handler | Handler[];

  constructor({ path, handler, method }: _Route) {
    this.path = path;
    this.handler = handler;
    this.method = method;
  }
}
