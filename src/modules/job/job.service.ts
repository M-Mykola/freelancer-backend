import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Job } from "./entities/job.entity";
import { Repository } from "typeorm";
import { IJob } from "./interface/job.interface";

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepo: Repository<Job>
  ) {}

  async createJob(dto: IJob): Promise<Job> {
    const newJob = await this.jobRepo.save(dto);
    return this.jobRepo.findOne({
      where: { id: newJob.id },
      relations: ["company"],
    });
  }

  findAll() {
    return `This action returns all job`;
  }

  async findOne(id: number) {
    const findJob = await this.jobRepo.findOne({ where: { id } });
    if (!findJob) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }
    return findJob;
  }

  async update(id: number, updateCompanyDto: IJob): Promise<Job> {
    const company = await this.jobRepo.findOneBy({ id: id });

    if (!company) {
      throw new BadRequestException("Company not found");
    }
    Object.assign(company, updateCompanyDto);
    return this.jobRepo.save(company);
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
