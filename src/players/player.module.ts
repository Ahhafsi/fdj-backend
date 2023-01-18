import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayerController } from './player.controller';
import { PlayerSchema } from './player.schema';
import { PlayerService } from './player.service';
import { IsPlayerExistConstraint } from './validators';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Player', schema: PlayerSchema }]),
  ],
  controllers: [PlayerController],
  providers: [PlayerService, IsPlayerExistConstraint],
  exports: [MongooseModule],
})
export class PlayerModule {}
