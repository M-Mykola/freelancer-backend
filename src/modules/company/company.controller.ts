import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { CompanyService } from "./company.service";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { ApiOperation } from "@nestjs/swagger";

@Controller("company")
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @ApiOperation({ summary: "Create a company" })
  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  @ApiOperation({ summary: "Get all" })
  @Get()
  findAll() {
    return this.companyService.findAll();
  }

  @ApiOperation({ summary: "Update Company" })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(+id, updateCompanyDto);
  }

  @ApiOperation({ summary: "Remove company" })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.companyService.remove(+id);
  }
}
