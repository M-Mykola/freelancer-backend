import { Injectable } from '@nestjs/common';
import { Office } from '../entities/office.entity';
import { OfficeDocument } from '../schema/office.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IOffice } from '../interface';

@Injectable()
export class OfficeRepository {
  constructor(
    @InjectModel(Office.name)
    private readonly officeModel: Model<OfficeDocument>,
  ) {}
  async createOffice(office: IOffice, user: string): Promise<any> {
    return new this.officeModel(office, user).save();
  }
}
