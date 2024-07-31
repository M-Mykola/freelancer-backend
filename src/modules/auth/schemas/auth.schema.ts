import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type JwtTokenDocument = HydratedDocument<JwtToken>;

@Schema()
export class JwtToken {
  @Prop({ required: true })
  token: string;

  @Prop({ required: true, default: true })
  blacklisted: boolean = true;
}

export const JwtTokenSchema = SchemaFactory.createForClass(JwtToken);
