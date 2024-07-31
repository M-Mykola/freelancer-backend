import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { EUserType } from '../enum';

export const ParamUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

export interface IParamUser {
  userId: string;
  userType: EUserType;
}
