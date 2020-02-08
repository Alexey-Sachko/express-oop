import { Session } from "./models/sessions";

export const getSessions = async () => {
  const sessions = await Session.find();
  return sessions;
};
