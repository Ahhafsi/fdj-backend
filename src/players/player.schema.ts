import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsCurrency } from '../shared/validators';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { HydratedDocument } from 'mongoose';
import { Type, Expose, Exclude } from 'class-transformer';

export type PlayerDocument = HydratedDocument<Player>;

class Signin {
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsCurrency()
  currency: string;
}

@Schema()
export class Player {
  @Prop()
  @IsString()
  @IsNotEmpty()
  @Expose()
  name: string;

  @Prop()
  @IsString()
  @IsNotEmpty()
  position: string;

  @Prop()
  @IsString()
  @IsNotEmpty()
  thumbnail: string;

  @Prop()
  @ValidateNested()
  @IsNotEmpty()
  @Type(() => Signin)
  signin: Signin;

  @Prop()
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  born: Date;
}
export const PlayerSchema = SchemaFactory.createForClass(Player);
