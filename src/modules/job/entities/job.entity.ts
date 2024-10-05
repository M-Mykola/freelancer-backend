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
@Unique(['name', 'company'])
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => Company, (company) => company.jobs, { onDelete: 'CASCADE' })
  company: number; 

  @OneToMany(() => Appliance, (appliance) => appliance.job, { cascade: true })
  appliances: Appliance[];
}
