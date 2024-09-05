import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { ICompany } from "../interface/company.interface";

export class CreateCompanyDto {
  @ApiProperty()
  @IsString()
  name: string;
}
