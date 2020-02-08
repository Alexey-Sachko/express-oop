import { User, getUsersRepository } from "./models/user";
import EmialClient from "../../mail/EmialClient";
import ConfirmEmail from "./utils/ConfirmEmail";
import {
  HTTP404Error,
  HTTPClientError,
  HTTP400Error
} from "../../utils/httpErrors";

export const login = async () => {
  // Make a tokens by login and password
  return {};
};

export const logout = async () => {
  // Remove refresh_token from database
  return {};
};

export const refreshToken = async () => {
  // Make a new tokens by refresh_token
  return {};
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
  return user;
};

export const confirmEmail = async (id: number, confirmUid: string) => {
  const repository = getUsersRepository();
  const user = await repository.findOne({ id });

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
  const result = await repository.save(user);

  return result;
};

export const deleteUser = async (id: number) => {
  return await User.delete({ id });
};

export const getUsers = async () => {
  // Allowed only for admins
  return await User.find();
};
