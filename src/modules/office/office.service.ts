import { Injectable } from '@nestjs/common';
import { CreateOfficeDto } from './dto/create-office.dto';
import { UpdateOfficeDto } from './dto/update-office.dto';
import { OfficeRepository } from './repository';

@Injectable()
export class OfficeService {
  constructor(private readonly officeRepository: OfficeRepository) {}

  create(createOfficeDto: CreateOfficeDto, userId: string) {
    return this.officeRepository.createOffice(createOfficeDto, userId);
  }

  findAll() {
    return `This action returns all office`;
  }

  findOne(id: number) {
    return `This action returns a #${id} office`;
  }

  update(id: number, updateOfficeDto: UpdateOfficeDto) {
    return `This action updates a #${id} office`;
  }

  remove(id: number) {
    return `This action removes a #${id} office`;
  }
}
