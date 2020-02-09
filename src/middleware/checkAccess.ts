import { Request, Response, NextFunction } from "express";
import UserContext from "../services/users/UserContext";
import { verifyAccessToken } from "../services/users/utils/jwt";
import { HTTP401Error } from "../utils/httpErrors";

export const checkAccessMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tokenHeader = req.get("Authorization");
  const tokenMatch = tokenHeader?.match(/Bearer\s*(.*)/);
  const token = tokenMatch?.[1];

  if (!token) {
    throw new HTTP401Error("Missing access token");
  }

  const parsedUser = verifyAccessToken<UserContext>(token);

  if (!parsedUser) {
    throw new HTTP401Error("Invalid access token");
  }

  req.context.user = new UserContext(parsedUser);
  next();
};
