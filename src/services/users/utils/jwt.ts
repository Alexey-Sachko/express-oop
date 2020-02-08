import jwt from "jsonwebtoken";
import config from "../../../config";

const { secret } = config.token;

export const makeAccessToken = (user: object) => {
  const token = jwt.sign(user, secret, {
    algorithm: "HS256",
    expiresIn: "1h"
  });

  return token;
};

export const verifyAccessToken = (token: string) => {
  try {
    const decodedData = jwt.verify(token, secret);
    return decodedData;
  } catch (err) {
    console.error("invalid token ", err);
    return false;
  }
};
