import { BadRequestException, Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(to: string, subject: string, context: IEmailContext) {
    try {
      const sandEmilRes = await this.mailerService.sendMail({
        to,
        subject,
        html: `<p>Hello,</p>
               <p>Your application for the job "${context.name}" from user "${context.from}" has been received.</p>
               <p>Thank you!</p>`,
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
