import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Job } from "./entities/job.entity";
import { Repository } from "typeorm";
import { IJob } from "./interface/job.interface";
import { Company } from "../company/entities/company.entity";

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepo: Repository<Job>,
    @InjectRepository(Company)
    private readonly companyRepo: Repository<Company>
  ) {}

  async createJob(dto: IJob): Promise<Job> {
    const company = await this.companyRepo.findOne({
      where: { id: dto.company },
    });
    if (!company) {
      throw new NotFoundException(`Company with ID ${dto.company} not found`);
    }

    const newJob = await this.jobRepo.save(dto);

    return this.jobRepo.findOne({
      where: { id: newJob.id },
      relations: ["company"],
    });
  }

  async findAll(): Promise<Job[]> {
    return this.jobRepo.find({
      relations: ["company"],
    });
  }
  

  async findOne(id: number) {
    const findJob = await this.jobRepo.findOne({ where: { id } });
    if (!findJob) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }
    return findJob;
  }

  async update(id: number, updateCompanyDto: IJob): Promise<Job> {
    const job = await this.jobRepo.findOneBy({ id: id });

    if (!job) {
      throw new BadRequestException("Job not found");
    }
    Object.assign(job, updateCompanyDto);
    return this.jobRepo.save(job);
  }

  async remove(id: number): Promise<void> {
    const job = await this.jobRepo.findOne({
      where: { id },
      relations: ["appliances"],
    });

    if (!job) {
      throw new BadRequestException("Company not found");
    }
    await this.jobRepo.remove(job);
  }
}
