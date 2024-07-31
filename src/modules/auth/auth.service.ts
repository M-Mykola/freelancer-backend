import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IParamUser } from 'src/utils/decorators';
import { UserRepository } from '../user/repository';
import { CreateUserDto } from '../user/dto/create-user.dto';
import * as argon2 from 'argon2';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtToken } from './schemas/auth.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserRepository))
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    @InjectModel(JwtToken.name) private jwtModel: Model<JwtToken>,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<any> {
    const userExist = await this.userRepository.findByEmailWithPassword(
      createUserDto.email,
    );

    if (userExist) {
      throw new BadRequestException('User already exist');
    }

    const hash = await this.hashData(createUserDto.password);

    const user = await this.userRepository.createUser({
      ...createUserDto,
      password: hash,
    });

    const tokens = await this.getTokens(user._id.toString(), user.userType);
    await this.updateRefreshToken(user._id.toString(), tokens.refreshToken);
    delete user.password;
    // sendRegistrationEmail(user.email);

    return { user, tokens };
  }

  async signIn(data: SignInDto) {
    const user = await this.userRepository.findByEmailWithPassword(data.email);
    if (!user) throw new BadRequestException('User does not exist');
    const passwordMatches = await argon2.verify(user.password, data.password);
    if (!passwordMatches)
      throw new BadRequestException('Password is incorrect');

    const tokens = await this.getTokens(user._id.toString(), user.userType);
    await this.updateRefreshToken(user._id.toString(), tokens.refreshToken);
    delete user.password;
    return { user, tokens };
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.userRepository.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  }
  private hashData(data: string) {
    return argon2.hash(data);
  }

  validateToken(token: string) {
    return this.jwtService.verify(token, {
      secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
    });
  }

  validateRefreshToken(token: string) {
    return this.jwtService.verify(token, {
      secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
    });
  }
  async invalidateToken(token: string) {
    const _token = token.replace('Bearer', '').trim();
    return await this.jwtModel.create({ token: _token });
  }

  async findBlackListed(token: string) {
    return await this.jwtModel.findOne({ token });
  }

  async verifyUserToken(authToken: string): Promise<IParamUser> {
    if (!authToken || authToken.trim() === '') {
      throw new UnauthorizedException('Bearer token was not provided.');
    }

    const user: IParamUser = await this.validateToken(authToken);

    if (user) {
      const isBlackListed = await this.findBlackListed(authToken);
      if (isBlackListed) {
        throw new UnauthorizedException('Session expired.Please sign in');
      }
      return user;
    }
  }

  async getTokens(userId: string, userType: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          userId,
          userType,
        },
        {
          secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
          expiresIn: this.configService.get<string>('ACCESS_TOKEN_LIFE_TIME'),
        },
      ),
      this.jwtService.signAsync(
        {
          userId,
          userType,
        },
        {
          secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
          expiresIn: this.configService.get<string>('REFRESH_TOKEN_LIFE_TIME'),
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  // async refreshTokens(userId: string, refreshToken: string) {
  //   const user = await this.userRepo.findById(userId);
  //   if (!user || !user.refreshToken) {
  //     throw new ForbiddenException('Access Denied');
  //   }
  //   const refreshTokenMatches = await argon2.verify(
  //     user.refreshToken,
  //     refreshToken,
  //   );
  //   if (!refreshTokenMatches) {
  //     throw new ForbiddenException('Access Denied');
  //   }
  //   const tokens = await this.getTokens(user.id, user.userType);
  //   await this.updateRefreshToken(user.id, tokens.refreshToken);
  //   return tokens;
  // }

  // async verifyUserToken(authToken: string): Promise<IParamUser> {
  //   if (!authToken || authToken.trim() === '') {
  //     throw new UnauthorizedException('Bearer token not provided');
  //   }
  //   const user: IParamUser = await this.validateToken(authToken);
  //   if (user) {
  //     const isBlackListed = await this.findBlacklisted(authToken);
  //     if (isBlackListed) {
  //       throw new UnauthorizedException('Session expired. Please sign in');
  //     }
  //     return user;
  //   }
  // }

  // async createResetPasswordToken(email: string): Promise<string> {
  //   const buffer = crypto.randomBytes(16);
  //   const token = buffer.toString('hex');

  //   const user = await this.userRepo.findByEmail(email);

  //   if (!user) {
  //     throw new NotFoundException('User not found.');
  //   }

  //   user.resetPasswordToken = token;
  //   user.resetPasswordExpires = new Date(Date.now() + RESET_TOKEN_TTL);
  //   await user.save();

  //   return token;
  // }

  // async handleRequestResetPassword(
  //   requestResetPassword: IRequestResetPassword,
  // ) {
  //   const user = await this.userRepo.findByEmail(requestResetPassword.email);

  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }

  //   const token = await this.createResetPasswordToken(user.email);
  //   const resetLink = `${this.configService.get<string>(
  //     'FRONTEND_URL',
  //   )}/reset-password?token=${token}`;
  //   const message = createMessage(
  //     'Please use the following link to reset your password',
  //     resetLink,
  //   );

  //   sendEmail([user.email], 'Password Reset', message);
  // }

  // async validateResetToken(token: string): Promise<{ valid: boolean }> {
  //   const user = await this.userRepo.findByResetToken(token);
  //   return { valid: !!user };
  // }

  // async resetPassword(resetPasswordDto: IResetPassword): Promise<any> {
  //   const { token, newPassword } = resetPasswordDto;

  //   const userToReset = await this.userRepo.findByResetToken(token);

  //   if (!userToReset) {
  //     throw new BadRequestException(MESSAGES.INVALID_RESET_TOKEN);
  //   }

  //   const hashedPassword = await this.hashData(newPassword);
  //   userToReset.set({
  //     password: hashedPassword,
  //     resetPasswordToken: null,
  //     resetPasswordExpires: null,
  //   });

  //   await userToReset.save();

  //   return { message: MESSAGES.PASSWORD_RESET };
  // }
}
