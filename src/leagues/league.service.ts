import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { validate } from 'class-validator';
import { Model } from 'mongoose';
import { League } from 'src/leagues/league.schema';

@Injectable()
export class LeagueService {
  constructor(
    @InjectModel('League') private readonly leagueModel: Model<League>,
  ) {}

  async create(league: Partial<League>): Promise<League> {
    const newLeague = new this.leagueModel(league);
    validate(newLeague).then((errors) => {
      if (errors.length > 0) {
        throw new BadRequestException(errors);
      }
    });
    return newLeague.save();
  }

  async findAll(): Promise<League[]> {
    return this.leagueModel.find().exec();
  }

  async findOne(name: string): Promise<League> {
    return await this.leagueModel.findOne({ name }).exec();
  }

  async findById(id: string): Promise<League> {
    return await this.leagueModel.findById(id).exec();
  }

  async update(id: string, league: League): Promise<League> {
    validate(league).then((errors) => {
      if (errors.length > 0) {
        throw new BadRequestException(errors);
      }
    });
    return await this.leagueModel
      .findByIdAndUpdate(id, league, { new: true })
      .exec();
  }

  async delete(id: string): Promise<League> {
    return await this.leagueModel.findByIdAndDelete(id).exec();
  }
}
