import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsArray, IsNotEmpty, IsString, ValidateIf } from 'class-validator';
import * as mongoose from 'mongoose';
import { Player } from 'src/players/player.schema';
import { Type } from 'class-transformer';
import { IsPlayerBelongToOneTeam } from './validators';
import { IsPlayerExist } from 'src/players/validators';

export type TeamDocument = mongoose.HydratedDocument<Team>;

@Schema()
export class Team {
  @Prop()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Prop()
  @IsString()
  @IsNotEmpty()
  thumbnail: string;

  @Prop()
  @IsArray()
  @Type(() => Player)
  @ValidateIf((o) => o.players)
  @IsPlayerExist()
  @IsPlayerBelongToOneTeam()
  players: Player[];
}
export const TeamSchema = SchemaFactory.createForClass(Team);
