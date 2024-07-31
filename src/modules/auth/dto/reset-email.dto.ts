import { IsEmail, IsNotEmpty } from 'class-validator';

export interface IRequestResetPassword {
  email: string;
}

export class RequestResetPasswordDTO implements IRequestResetPassword {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
