import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString, Length } from "class-validator";
import { IJob } from "../interface/job.interface";

export class CreateJobDto implements IJob {
  @ApiProperty({ default: "Software Developer" })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ default: "Some description" })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ default: 1 })
  @IsNotEmpty()
  @IsInt()
  company: number;
}
