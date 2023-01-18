import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayerModule } from 'src/players/player.module';
import { TeamController } from './team.controller';
import { TeamSchema } from './team.schema';
import { TeamService } from './team.service';
import {
  IsPlayerBelongToOneTeamConstraint,
  IsTeamExistConstraint,
} from './validators';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Team', schema: TeamSchema }]),
    PlayerModule,
  ],
  controllers: [TeamController],
  providers: [
    TeamService,
    IsPlayerBelongToOneTeamConstraint,
    IsTeamExistConstraint,
  ],
  exports: [MongooseModule],
})
export class TeamModule {}
