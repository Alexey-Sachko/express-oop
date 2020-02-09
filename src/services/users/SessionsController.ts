import { Session } from "./models/sessions";
import { HTTP401Error } from "../../utils/httpErrors";
import { User } from "./models/user";

export const getSessions = async () => {
  const sessions = await Session.find();
  return sessions;
};

export const getSessionByToken = async (refreshToken: string) => {
  const session = await Session.findOne({ refreshToken });

  if (!session) {
    throw new HTTP401Error(
      `This refreshToken does not exists: ${refreshToken}`
    );
  }

  return session;
};

const killSessionsByUserId = async (userId: number) => {};

type CreateSessionData = {
  user: User;
};

export const createSession = async ({ user }: CreateSessionData) => {
  const oldSessions = await Session.find({ userId: user.id });

  if (oldSessions.length > 4) {
    await killSessionsByUserId(user.id);
  }

  if (oldSessions.length === 0) {
    const newSession = new Session(user);
    return await newSession.save();
  }

  oldSessions[0].makeRefreshToken();
  return await oldSessions[0].save();
};
