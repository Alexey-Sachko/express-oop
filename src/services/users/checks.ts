import { Request, Response, NextFunction } from "express";
import Joi from "@hapi/joi";
import { HTTP400Error } from "../../utils/httpErrors";

export const checkRefreshBody = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.body.refreshToken) {
    throw new HTTP400Error("missing refreshToken field");
  }
  next();
};

export const checkLoginBody = (() => {
  const schema = Joi.object({
    email: Joi.string()
      .min(5)
      .required(),

    password: Joi.string()
      .min(3)
      .max(30)
      .required()
  });

  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw new HTTP400Error(error);
    }
    next();
  };
})();

export const checkRegisterBody = (() => {
  const schema = Joi.object({
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),

    password: Joi.string()
      .pattern(/^[a-zA-Z0-9]{3,30}$/)
      .required(),

    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .required()
  });

  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw new HTTP400Error(error);
    }
    next();
  };
})();
