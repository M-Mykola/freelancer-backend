import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateApplianceDto } from './dto/create-appliance.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApplianceService } from './appliance.service';
import { UpdateApplicantDto } from './dto/update-appliance.dto';

@ApiTags('Appliance')
@Controller('appliance')
export class ApplianceController {
  constructor(private readonly applianceService: ApplianceService) {}

  @Post()
  create(@Body() createApplicantDto: CreateApplianceDto) {
    return this.applianceService.create(createApplicantDto);
  }
}
