import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { Player } from 'src/players/player.schema';
import { PlayerService } from './player.service';

@Controller('players')
export class PlayerController {
  constructor(private playerService: PlayerService) {}

  @Post()
  async create(@Body() player: Player): Promise<Player> {
    return await this.playerService.create(player);
  }

  @Get()
  async findAll(): Promise<Player[]> {
    return await this.playerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Player> {
    return this.playerService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() player: Player) {
    return this.playerService.update(id, player);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.playerService.delete(id);
  }
}
