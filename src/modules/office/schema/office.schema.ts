import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, SchemaTypes } from 'mongoose';

export type OfficeDocument = HydratedDocument<Office>;

@Schema({ timestamps: true, versionKey: false })
export class Office {
  @Prop({ required: true, ref: 'User', type: SchemaTypes.ObjectId })
  user: mongoose.Types.ObjectId;

  @Prop({ required: true, unique: true })
  officeName: string;
}

export const OfficeSchema = SchemaFactory.createForClass(Office);
