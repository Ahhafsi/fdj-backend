import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LeagueSchema } from './league.schema';
import { LeagueController } from './league.controller';
import { LeagueService } from './league.service';
import { TeamModule } from 'src/teams/team.module';
import { IsTeamBelongToOneLeagueConstraint } from './validators';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'League', schema: LeagueSchema }]),
    TeamModule,
  ],
  controllers: [LeagueController],
  providers: [LeagueService, IsTeamBelongToOneLeagueConstraint],
  exports: [MongooseModule],
})
export class LeagueModule {}
