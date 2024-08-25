import { PartialType } from '@nestjs/mapped-types';
import { CreateApplianceDto } from './create-appliance.dto';

export class UpdateApplicantDto extends PartialType(CreateApplianceDto) {}
