import { Module, forwardRef } from '@nestjs/common';
import { OfficeService } from './office.service';
import { OfficeController } from './office.controller';
import { AuthModule } from '../auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Office } from './entities/office.entity';
import { OfficeSchema } from './schema/office.schema';
import { OfficeRepository } from './repository';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    MongooseModule.forFeature([{ name: Office.name, schema: OfficeSchema }]),
  ],
  controllers: [OfficeController],
  providers: [OfficeService, OfficeRepository],
  exports: [OfficeRepository],
})
export class OfficeModule {}
