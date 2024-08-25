import { Appliance } from "src/modules/appliance/entities/appliance.entity";
import { Company } from "src/modules/company/entities/company.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
  ManyToOne,
} from "typeorm";

@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Unique(["jobName"])
  @Column()
  jobName: string;

  @Column()
  jobDescription: string;

  @ManyToOne(() => Company, (company) => company.jobs, { onDelete: 'CASCADE' })
  company: number; 

  @OneToMany(() => Appliance, (appliance) => appliance.job, { cascade: true })
  appliances: Appliance[];
}
