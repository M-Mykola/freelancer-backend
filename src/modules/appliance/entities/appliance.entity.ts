import { Job } from "src/modules/job/entities/job.entity";
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";

@Entity()
export class Appliance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Unique(["userEmail"])
  @Column()
  userEmail: string;

  @Column()
  applianceText: string;

  @ManyToOne(() => Job, (job) => job.appliances, { onDelete: "CASCADE" })
  job: number;
}
