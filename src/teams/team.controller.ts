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
import { Team } from './team.schema';
import { TeamService } from './team.service';

@Controller('teams')
export class TeamController {
  constructor(private teamService: TeamService) {}

  @Post()
  async create(@Body() team: Team): Promise<Team> {
    return await this.teamService.create(team);
  }

  @Get()
  async findAll(): Promise<Team[]> {
    return await this.teamService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Team> {
    return await this.teamService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() team: Team) {
    return this.teamService.update(id, team);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.teamService.delete(id);
  }
}
