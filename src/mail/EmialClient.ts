import nodemailer, { Transporter } from "nodemailer";
import config from "../config";
import BaseEmail from "./BaseEmail";

class EmailClient {
  private transporter: Transporter;
  private ownAddress: string;
  private password: string;

  constructor() {
    this.ownAddress = config.email.address;
    this.password = config.email.password;
    this.transporter = nodemailer.createTransport({
      host: "smtp.yandex.ru",
      port: 465,
      auth: {
        user: this.ownAddress,
        pass: this.password
      }
    });
  }

  async send({ text, to, subject }: BaseEmail) {
    const result = await this.transporter.sendMail({
      from: this.ownAddress,
      to,
      text,
      subject
    });
    return result;
  }
}

export default new EmailClient();
