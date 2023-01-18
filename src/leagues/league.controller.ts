import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { League } from 'src/leagues/league.schema';
import { LeagueService } from './league.service';

@Controller('leagues')
export class LeagueController {
  constructor(private leagueService: LeagueService) {}

  @Post()
  async create(@Body() league: League): Promise<League> {
    return await this.leagueService.create(league);
  }

  @Get()
  async findAll(): Promise<League[]> {
    return await this.leagueService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<League> {
    return await this.leagueService.findById(id);
  }
}
