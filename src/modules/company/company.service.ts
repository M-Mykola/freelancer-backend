import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Company } from "./entities/company.entity";
import { Repository } from "typeorm";
import { ICompany } from "./interface/company.interface";
import { ApiTags } from "@nestjs/swagger";
import { Job } from "../job/entities/job.entity";

@ApiTags("Company")
@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepo: Repository<Company>,
    @InjectRepository(Job)
    private readonly jobRepo: Repository<Job>
  ) {}

  async create(dto: CreateCompanyDto): Promise<ICompany | undefined> {
    const companyExist = await this.companyRepo.findOneBy({
      companyName: dto.companyName,
    });

    if (companyExist) {
      throw new BadRequestException(
        "The company with same name already exists"
      );
    }
    return await this.companyRepo.save(dto);
  }

  async findAll(): Promise<ICompany[] | undefined> {
    return await this.companyRepo.find();
  }

  async update(
    id: number,
    updateCompanyDto: UpdateCompanyDto
  ): Promise<Company> {
    const company = await this.companyRepo.findOneBy({ id });
    if (!company) {
      throw new BadRequestException("Company not found");
    }
    Object.assign(company, updateCompanyDto);
    return this.companyRepo.save(company);
  }

  async remove(id: number): Promise<void> {
    const company = await this.companyRepo.findOne({
      where: { id },
      relations: ["jobs"],
    });

    if (!company) {
      throw new BadRequestException("Company not found");
    }
    await this.companyRepo.remove(company);
  }
}
