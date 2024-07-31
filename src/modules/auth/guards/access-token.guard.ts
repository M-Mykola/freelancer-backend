import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { authorization }: any = request.headers;
    const authToken = String(authorization)
      .replace(/bearer/gim, '')
      .trim();
    const user = await this.authService.verifyUserToken(authToken);
    if (user) {
      request.user = user;
      return true;
    }
    throw new UnauthorizedException('error');
  }
}
