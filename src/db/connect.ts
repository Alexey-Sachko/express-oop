import { createConnection } from "typeorm";
import { User } from "../services/users/models/user";

export default async function connectToDb() {
  const connection = await createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "alexey",
    password: "example",
    database: "postgres",
    entities: [User],
    synchronize: true,
    logging: false
  });
  console.log("successfully connected to database");
  return connection;
}
