import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtRefreshGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const { authorization }: any = request.headers;
      if (!authorization || authorization.trim() === '') {
        throw new UnauthorizedException('Bearer Token was not provided');
      }
      const refreshToken = authorization.replace(/bearer/gim, '').trim();
      const user = this.authService.validateRefreshToken(refreshToken);
      request.user = user;
      request.refreshToken = refreshToken;
      return true;
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
}
