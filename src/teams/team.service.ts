import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { validate } from 'class-validator';
import { Model } from 'mongoose';
import { Team } from './team.schema';
import { NotFoundException } from '@nestjs/common/exceptions';
import { Player } from 'src/players/player.schema';

@Injectable()
export class TeamService {
  constructor(@InjectModel('Team') private readonly teamModel: Model<Team>) {}

  async create(team: Partial<Team>): Promise<Team> {
    const newTeam = new this.teamModel(team);
    validate(newTeam).then((errors) => {
      if (errors.length > 0) {
        throw new BadRequestException(errors);
      }
    });
    return newTeam.save();
  }

  async findAll(): Promise<Team[]> {
    return this.teamModel.find().exec();
  }

  async findOne(name: string): Promise<Team> {
    return await this.teamModel.findOne({ name }).exec();
  }

  async findById(id: string): Promise<Team> {
    return await this.teamModel.findById(id).exec();
  }

  async update(id: string, team: Team): Promise<Team> {
    validate(team).then((errors) => {
      if (errors.length > 0) {
        throw new BadRequestException(errors);
      }
    });
    try {
      return await this.teamModel
        .findByIdAndUpdate(id, team, { new: true })
        .exec();
    } catch (error) {
      throw new NotFoundException(`Team with id ${id} not found`);
    }
  }

  async delete(id: string) {
    try {
      const deleted = await this.teamModel.findByIdAndDelete(id).exec();
      if (!deleted) throw new NotFoundException(`Team with id ${id} not found`);
    } catch (error) {
      throw new NotFoundException(`Team with id ${id} not found`);
    }
  }
}
