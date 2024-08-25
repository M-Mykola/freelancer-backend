import { MailerOptions, MailerOptionsFactory } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import {
  MAILER_HOST,
  MAILER_PASSWORD,
  MAILER_PORT,
  MAILER_USER,
} from "src/config";

@Injectable()
export class MailerConfigService implements MailerOptionsFactory {
  createMailerOptions(): MailerOptions {
    return {
      transport: {
        host: MAILER_HOST,
        port: MAILER_PORT,
        secure: false,
        auth: {
          user: MAILER_USER,
          pass: MAILER_PASSWORD,
        },
      },
      defaults: {
        from: "Test task",
      },
    };
  }
}
