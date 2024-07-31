import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { IUser } from '../interface';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async findByEmailWithPassword(email: string) {
    const user = await this.userModel.findOne({ email }).select('+password');
    if (user) return user.toJSON();
    return null;
  }

  async createUser(user: IUser): Promise<any> {
    const newUser = new this.userModel(user);
    newUser.save();
    return newUser.toJSON();
  }

  async update(userId: string, update): Promise<UserDocument> {
    return this.userModel.findByIdAndUpdate(userId, update, { new: true });
  }
}
