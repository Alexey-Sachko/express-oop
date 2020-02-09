import { createConnection } from "typeorm";
import { User } from "../services/users/models/user";
import { Session } from "../services/users/models/sessions";

export default async function connectToDb() {
  const connection = await createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "alexey",
    password: "example",
    database: "postgres",
    entities: [User, Session],
    synchronize: true,
    logging: false
  });
  console.log("successfully connected to database");
  return connection;
}
