import { Job } from "src/modules/job/entities/job.entity";
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { ICompany } from "../interface/company.interface";

@Entity()
export class Company implements ICompany {
  @PrimaryGeneratedColumn()
  id: number;

  @Unique(["companyName"])
  @Column()
  companyName: string;

  @OneToMany(() => Job, (job) => job.company, { cascade: true })
  jobs: Job[];
}
