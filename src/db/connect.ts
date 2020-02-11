import { createConnection } from "typeorm";
import { User } from "../services/users/models/user";
import { Session } from "../services/users/models/sessions";
import config from "../config";

const { username, port, password, host, name } = config.db;

export default async function connectToDb() {
  const connection = await createConnection({
    type: "postgres",
    host,
    port,
    username,
    password,
    database: name,
    entities: [User, Session],
    synchronize: true,
    logging: false
  });
  console.log("successfully connected to database");
  return connection;
}
