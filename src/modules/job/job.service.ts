import {
  BadRequestException,
  Injectable,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Job } from "./entities/job.entity";
import { Repository } from "typeorm";
import { IJob } from "./interface/job.interface";
import { Company } from "../company/entities/company.entity";
import { QueryFailedError } from 'typeorm';

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
      throw new BadRequestException(`Company with ID ${dto.company} not found`);
    }

    try {
      const newJob = await this.jobRepo.save(dto);
  
      return this.jobRepo.findOne({
        where: { id: newJob.id },
        relations: ['company'],
      });

    } catch (error) {
      if (error instanceof QueryFailedError && error.message.includes('duplicate key')) {
        throw new BadRequestException(
          `Job with name "${dto.name}" already exists for company ID ${dto.company}`
        );
      }
      throw error;
    }
  }
  

  async findAll(): Promise<Job[]> {
    return this.jobRepo.find({
      relations: ["company"],
    });
  }
  

  async findOne(id: number) {
    const findJob = await this.jobRepo.findOne({ where: { id } });
    if (!findJob) {
      throw new BadRequestException(`Job with ID ${id} not found`);
    }
    return findJob;
  }

  async update(id: number, updateJobDto: IJob): Promise<Job> {
    const job = await this.jobRepo.findOne({
      where: { id },
      relations: ['company'],
    });
  
    if (!job) {
      throw new BadRequestException(`Job with ID ${id} not found`);
    }
  
    const company = await this.companyRepo.findOne({
      where: { id: updateJobDto.company },
    });
  
    if (!company) {
      throw new BadRequestException(`Company with ID ${updateJobDto.company} not found`);
    }
  
    Object.assign(job, updateJobDto);
  
    try {
      const updatedJob = await this.jobRepo.save(job);
      return this.jobRepo.findOne({
        where: { id: updatedJob.id },
        relations: ['company'],
      });
  
    } catch (error) {
      if (error instanceof QueryFailedError && error.message.includes('duplicate key')) {
        throw new BadRequestException(
          `Job with name "${updateJobDto.name}" already exists for company ID ${updateJobDto.company}`
        );
      }
      throw error;
    }
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
