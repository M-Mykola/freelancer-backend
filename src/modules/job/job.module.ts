import { Module, forwardRef } from "@nestjs/common";
import { JobService } from "./job.service";
import { JobController } from "./job.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Job } from "./entities/job.entity";
import { Appliance } from "../appliance/entities/appliance.entity";
import { ApplianceModule } from "../appliance/appliance.module";
import { Company } from "../company/entities/company.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Job, Appliance, Company])],
  controllers: [JobController],
  providers: [JobService],
  exports: [JobService],
})
export class JobModule {}
