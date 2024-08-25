import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsInt, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateApplianceDto {
  @ApiProperty({ default: 1 })
  @IsInt()
  job: number;

  @ApiProperty({ default: "Example" })
  @IsString()
  userName: string;

  @ApiProperty({ default: "example@ddd.com" })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  userEmail: string;

  @ApiProperty({ default: "Appliance Text" })
  @IsNotEmpty()
  @IsString()
  applianceText: string;
}
