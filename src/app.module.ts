import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayerModule } from './players/player.module';
import { TeamModule } from './teams/team.module';
import { IsCurrencyValidator } from './shared/validators';
import { LeagueModule } from './leagues/league.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/fdj'),
    PlayerModule,
    TeamModule,
    LeagueModule,
  ],
  providers: [IsCurrencyValidator],
})
export class AppModule {}
