type UserContextData = {
  email: string;
  username: string;
  isAdmin?: boolean;
};

export default class UserContext {
  readonly isAdmin: boolean;
  readonly email: string;
  readonly username: string;

  constructor({ isAdmin = false, email, username }: UserContextData) {
    this.isAdmin = isAdmin;
    this.email = email;
    this.username = username;
  }

  toJSON() {
    const { email, isAdmin, username } = this;
    return { email, isAdmin, username };
  }
}
