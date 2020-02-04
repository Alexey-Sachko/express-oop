import { Response } from "express";

export const responseJson = (res: Response, body: object | Array<unknown>) => {
  res.header("Content-Type", "application/json");
  res.send(JSON.stringify(body, null, 2));
};
