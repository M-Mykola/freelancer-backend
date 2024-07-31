import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';
import { EUserType } from 'src/utils/enum';

export class CreateUserDto {
  @ApiProperty({ default: 'example@mail.com' })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ default: 'password' })
  @IsString()
  @Length(8, 30)
  password: string;

  @ApiProperty({ default: 'The Owner' })
  @IsString()
  userType: EUserType;
}
