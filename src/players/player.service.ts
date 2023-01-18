import { Injectable, BadRequestException } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/mongoose';
import { validate } from 'class-validator';
import { Model } from 'mongoose';
import { Player } from 'src/players/player.schema';

@Injectable()
export class PlayerService {
  constructor(
    @InjectModel('Player') private readonly playerModel: Model<Player>,
  ) {}

  async create(player: Partial<Player>): Promise<Player> {
    const newPlayer = new this.playerModel(player);
    validate(newPlayer).then((errors) => {
      if (errors.length > 0) {
        throw new BadRequestException(errors);
      }
    });
    return newPlayer.save();
  }

  async findAll(): Promise<Player[]> {
    return this.playerModel.find().exec();
  }

  async findOne(name: string): Promise<Player> {
    return await this.playerModel.findOne({ name }).exec();
  }

  async findById(id: string): Promise<Player> {
    return await this.playerModel.findById(id).exec();
  }

  async update(id: string, player: Player): Promise<Player> {
    validate(player).then((errors) => {
      if (errors.length > 0) {
        throw new BadRequestException(errors);
      }
    });
    try {
      return await this.playerModel
        .findByIdAndUpdate(id, player, { new: true })
        .exec();
    } catch (error) {
      throw new NotFoundException(`Player with id ${id} not found`);
    }
  }

  async delete(id: string) {
    try {
      const deleted = await this.playerModel.findByIdAndDelete(id).exec();
      if (!deleted)
        throw new NotFoundException(`Player with id ${id} not found`);
    } catch (error) {
      throw new NotFoundException(`Player with id ${id} not found`);
    }
  }
}
