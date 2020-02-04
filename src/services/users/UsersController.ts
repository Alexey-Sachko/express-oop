import { User } from "./models/user";

export const login = async () => {
  // Make a tokens by login and password
  return {};
};

export const logout = async () => {
  return {};
};

export const refreshToken = async () => {
  return {};
};

export const createUser = async () => {
  const user = new User("Alexey", "helllo@mail.com");
  await user.save();
  return user;
};

export const getUsers = async () => {
  return await User.find();
};
