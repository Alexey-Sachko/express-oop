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
  }
};

export default config;
