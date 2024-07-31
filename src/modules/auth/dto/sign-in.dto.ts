import { OmitType } from '@nestjs/swagger';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';

export class SignInDto extends OmitType(CreateUserDto, ['userType']) {}
