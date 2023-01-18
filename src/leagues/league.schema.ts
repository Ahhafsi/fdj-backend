import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { IsArray, ValidateIf } from 'class-validator';
import * as mongoose from 'mongoose';
import { IsTeamExist } from 'src/teams/validators';
import { Team } from '../teams/team.schema';
import { IsTeamBelongToOneLeague } from './validators';

export type LeagueDocument = mongoose.HydratedDocument<League>;

@Schema()
export class League {
  @Prop()
  name: string;

  @Prop()
  sport: string;

  @Prop()
  @IsArray()
  @Type(() => Team)
  @ValidateIf((o) => o.teams)
  @IsTeamExist()
  @IsTeamBelongToOneLeague()
  teams: Team[];
}
export const LeagueSchema = SchemaFactory.createForClass(League);
