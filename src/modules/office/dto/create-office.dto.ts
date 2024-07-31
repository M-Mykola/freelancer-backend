import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateOfficeDto {
  @ApiProperty({ default: 'Eyelash Extension Master' })
  @IsString()
  officeName: string;
}
