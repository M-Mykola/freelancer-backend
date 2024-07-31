import { EUserType } from 'src/utils/enum';

export interface IUser {
  email: string;
  password: string;
  userType: EUserType;
  refreshToken?: string;
}
