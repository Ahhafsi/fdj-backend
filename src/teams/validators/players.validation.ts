import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Model } from 'mongoose';
import { Player } from 'src/players/player.schema';
import { Team } from '../team.schema';
import { InjectModel } from '@nestjs/mongoose';

@ValidatorConstraint({ name: 'playerBelongToOneTeam', async: false })
@Injectable()
export class IsPlayerBelongToOneTeamConstraint
  implements ValidatorConstraintInterface
{
  constructor(@InjectModel('Team') private readonly teamModel: Model<Team>) {}
  async validate(players: Player[], args: ValidationArguments) {
    // check if players are belong to one team only
    const result = await this.teamModel.find({ players: { $in: players } });
    if (result.length !== 1) {
      return false;
    }
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return 'one or more player belong already to an other team.';
  }
}

export const IsPlayerBelongToOneTeam =
  (options?: ValidationOptions) => (object: Object, propertyName: string) =>
    registerDecorator({
      name: `playerBelongToOneTeam`,
      target: object.constructor,
      propertyName,
      options,
      constraints: [],
      validator: IsPlayerBelongToOneTeamConstraint,
    });
