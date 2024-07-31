import {
  Controller,
  // Get,
  Post,
  Body,
  // Patch,
  Param,
  // Delete,
  UseGuards,
} from '@nestjs/common';
import { OfficeService } from './office.service';
import { CreateOfficeDto } from './dto/create-office.dto';
import { UpdateOfficeDto } from './dto/update-office.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards';
import { IParamUser, ParamUser } from 'src/utils/decorators';

@ApiTags('Office')
@Controller('office')
@ApiBearerAuth()
export class OfficeController {
  constructor(private readonly officeService: OfficeService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  create(
    @Body() createOfficeDto: CreateOfficeDto,
    @ParamUser() paramUser: IParamUser,
  ) {
    return this.officeService.create(createOfficeDto, paramUser.userId);
  }

  // @Get()
  findAll() {
    return this.officeService.findAll();
  }

  // @Get(':id')
  findOne(@Param('id') id: string) {
    return this.officeService.findOne(+id);
  }

  // @Patch(':id')
  update(@Param('id') id: string, @Body() updateOfficeDto: UpdateOfficeDto) {
    return this.officeService.update(+id, updateOfficeDto);
  }

  // @Delete(':id')
  remove(@Param('id') id: string) {
    return this.officeService.remove(+id);
  }
}
