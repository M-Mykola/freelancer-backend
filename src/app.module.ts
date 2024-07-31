import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { MONGO_URI } from './config';
import { OfficeModule } from './modules/office/office.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(MONGO_URI),
    AuthModule,
    OfficeModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
