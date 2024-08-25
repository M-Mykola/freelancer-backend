import { Module } from '@nestjs/common';
import { MailerModule as NestMailerModule } from '@nestjs-modules/mailer';
import { MailerConfigService } from './config/mailer.config';
import { EmailService } from './mailer.service';

@Module({
  imports: [
    NestMailerModule.forRootAsync({
      useClass: MailerConfigService,
    }),
  ],
  providers: [EmailService],
  exports: [EmailService], 
})
export class MailerModule {}
