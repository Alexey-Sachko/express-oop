import express, { Router } from "express";
import UserContext from "../services/users/UserContext";

class Context {
  constructor(public user?: UserContext) {}
}

declare global {
  namespace Express {
    interface Request {
      context: Context;
    }
  }
}

export const applyContext = (router: Router) => {
  router.use((req, res, next) => {
    req.context = new Context();
    next();
  });
};
