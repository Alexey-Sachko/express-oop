import dotenv from "dotenv";
dotenv.config();

const { env } = process;

const config = {
  email: {
    address: env.OWN_EMAIL || "",
    password: env.OWN_EMAIL_PASSWORD || ""
  },
  token: {
    secret: env.JWT_SECRET || "exampleSecret"
  },
  db: {
    name: "postgres",
    host: env.DB_HOST || "localhost",
    port: Number(env.DB_PORT) || 5432,
    username: env.DB_USER || "alexey",
    password: env.DB_PASSWORD || "example"
  }
};

export default config;
