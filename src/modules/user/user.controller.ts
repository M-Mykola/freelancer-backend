import { Controller, Injectable } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Injectable()
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor() {}
}
