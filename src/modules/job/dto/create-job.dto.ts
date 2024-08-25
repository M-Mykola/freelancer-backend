import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateJobDto {
  @ApiProperty({ default: "Software Developer" })
  @IsNotEmpty()
  @IsString()
  jobName: string;

  @ApiProperty({ default: "Some description" })
  @IsNotEmpty()
  @IsString()
  jobDescription: string;

  @ApiProperty({ default: "Some name" })
  @IsNotEmpty()
  @IsInt()
  company: number;
}
