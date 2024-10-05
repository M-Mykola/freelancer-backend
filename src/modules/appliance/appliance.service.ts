import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from "@nestjs/common";
import { CreateApplianceDto } from "./dto/create-appliance.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Appliance } from "./entities/appliance.entity";
import { Repository } from "typeorm";
import { EmailService } from "../mailer/mailer.service";
import { Job } from "../job/entities/job.entity";

@Injectable()
export class ApplianceService {
  constructor(
    @InjectRepository(Appliance)
    private readonly applianceRepo: Repository<Appliance>,
    @Inject(forwardRef(() => EmailService))
    private readonly emailService: EmailService,
    @InjectRepository(Job)
    private readonly jobRepo: Repository<Job>
  ) {}

  async create(dto: CreateApplianceDto) {
    const job = await this.jobRepo.findOne({ where: { id: dto.job } });
    if (!job) {
      throw new BadRequestException("Job with this ID not found.");
    }

    const existingApplication = await this.applianceRepo.findOne({
      where: { userEmail: dto.userEmail, job: dto.job },
    });

    if (existingApplication) {
      throw new BadRequestException("User has already applied for this job")
    }

    const createdApplication = await this.applianceRepo.save(dto);
    if (!createdApplication) {
      throw new BadRequestException("Failed to save the application");
    }

    const saveAppliance = await this.applianceRepo.findOne({
      where: { id: createdApplication.id },
      relations: ["job"],
    });

    if (!saveAppliance) {
      throw new BadRequestException("Failed to retrieve the saved application");
    }

    const emailResponse = await this.emailService.sendEmail(
      dto.userEmail,
      `New application from "${dto.userName}"`,
      { name: job.name, from: dto.userEmail }
    );

    return { saveAppliance, emailResponse };
  }

  async findOne(id: number): Promise<Appliance> {
    const appliance = await this.applianceRepo.findOne({ where: { id } });
    if (!appliance) {
      throw new NotFoundException(`Appliance with ID ${id} not found`);
    }
    return appliance;
  }
}
