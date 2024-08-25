import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplianceService } from "./appliance.service";
import { ApplianceController } from "./appliance.controller";
import { Appliance } from "./entities/appliance.entity";
import { Job } from "../job/entities/job.entity";
import { MailerModule } from "../mailer/mailer.module";
import { Repository } from "typeorm";

@Module({
  imports: [
    TypeOrmModule.forFeature([Appliance, Job]),
    forwardRef(() => MailerModule),
  ],
  controllers: [ApplianceController],
  providers: [ApplianceService,Repository],
  exports: [ApplianceService],
})
export class ApplianceModule {}
