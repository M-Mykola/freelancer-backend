import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { JobModule } from "./modules/job/job.module";
import { Job } from "./modules/job/entities/job.entity";
import { ApplianceModule } from "./modules/appliance/appliance.module";
import { CompanyModule } from "./modules/company/company.module";
import { MailerModule } from "./modules/mailer/mailer.module";
import { Appliance } from "./modules/appliance/entities/appliance.entity";
import { DATABASE_HOST, DATABASE_PASSWORD, DATABASE_PORT_NUMBER, DATABASE_USER } from "./config";


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: DATABASE_HOST,
      port: DATABASE_PORT_NUMBER,
      password: DATABASE_PASSWORD,
      username: DATABASE_USER,
      autoLoadEntities: true,
      database: "postgres",
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([Job, Appliance]),
    JobModule,
    ApplianceModule,
    CompanyModule,
    MailerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
