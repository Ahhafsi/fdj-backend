import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Model } from 'mongoose';
import { Player } from 'src/players/player.schema';
import { InjectModel } from '@nestjs/mongoose';

@ValidatorConstraint({ name: 'playerExists', async: false })
@Injectable()
export class IsPlayerExistConstraint implements ValidatorConstraintInterface {
  constructor(
    @InjectModel('Player') private readonly playerModel: Model<Player>,
  ) {}
  async validate(players: Player[]) {
    // check if players are exist in the database
    const existingPlayers = await this.playerModel.find({
      _id: { $in: players },
    });
    if (existingPlayers.length !== players.length) {
      return false;
    }

    return true;
  }
  defaultMessage() {
    return 'one or more player does not exist.';
  }
}

export const IsPlayerExist =
  (options?: ValidationOptions) => (object: Object, propertyName: string) =>
    registerDecorator({
      name: `playerExists`,
      target: object.constructor,
      propertyName,
      options,
      constraints: [],
      validator: IsPlayerExistConstraint,
    });
