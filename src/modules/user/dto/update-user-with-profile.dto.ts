import { OmitType } from '@nestjs/swagger';

import { CreateUserDto } from './create-user.dto';

export class UpdateUserTypeDto extends OmitType(CreateUserDto, [
  'email',
  'password',
]) {}
