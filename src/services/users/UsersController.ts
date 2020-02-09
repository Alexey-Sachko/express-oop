import { User } from "./models/user";
import EmialClient from "../../mail/EmialClient";
import ConfirmEmail from "./utils/ConfirmEmail";
import {
  HTTP404Error,
  HTTP400Error,
  HTTP401Error
} from "../../utils/httpErrors";
import { makeAccessToken } from "./utils/jwt";
import { Session } from "./models/sessions";
import { createSession } from "./SessionsController";

type LoginData = {
  email: string;
  password: string;
};

export const getUserByEmail = async (email: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new HTTP404Error(`not found with email: '${email}'`);
  }

  return user.toResponseObject();
};

export const login = async ({ email, password }: LoginData) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new HTTP401Error("wrong password or email");
  }

  if (!(await user.comparePassword(password))) {
    throw new HTTP401Error("wrong password or email");
  }

  const session = await createSession({ user });
  const safeUser = user.toResponseObject();
  const accessToken = makeAccessToken(safeUser);
  const refreshToken = session.refreshToken;

  return { accessToken, refreshToken };
};

export const logout = async (refreshToken: string) => {
  const session = await Session.findOne({ refreshToken });

  if (!session) {
    throw new HTTP401Error("Already Unauthorized");
  }

  await session.remove();
  return {};
};

export const refreshToken = async (token: string) => {
  const session = await Session.findOne({ refreshToken: token });

  if (!session) {
    throw new HTTP401Error(`Invalid refreshToken: '${token}'`);
  }

  session.makeRefreshToken();
  const user = await User.findOne({ id: session.userId });

  if (!user) {
    throw new HTTP401Error(`user with id: '${session.userId}' does not exists`);
  }

  const accessToken = makeAccessToken(user.toResponseObject());
  await session.save();

  return {
    accessToken,
    refreshToken: session.refreshToken,
    user: session.user
  };
};

export const register = async (
  email: string,
  username: string,
  password: string
) => {
  const user = new User(username, email, password);
  await user.save();
  const result = await EmialClient.send(
    new ConfirmEmail(email, user.id, user.confirmUid || "")
  );
  return user.toResponseObject();
};

export const confirmEmail = async (id: number, confirmUid: string) => {
  const user = await User.findOne({ id });

  if (!user) {
    throw new HTTP404Error("not found user");
  }

  if (user.isConfirmed) {
    throw new HTTP400Error(`email of user with id: '${id}' already confirmed`);
  }

  if (user.confirmUid !== confirmUid) {
    throw new HTTP400Error(`wrong confirm uid: ${confirmUid}`);
  }

  user.isConfirmed = true;
  const result = await user.save();

  return result;
};

export const deleteUser = async (id: number) => {
  // Allowed only for admins
  return await User.delete({ id });
};

export const getUsers = async () => {
  // Allowed only for admins
  const users = await User.find();
  return users.map(user => user.toResponseObject());
};
