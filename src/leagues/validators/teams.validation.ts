import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Team } from 'src/teams/team.schema';

@ValidatorConstraint({ name: 'teamBelongToOneLeague', async: false })
@Injectable()
export class IsTeamBelongToOneLeagueConstraint
  implements ValidatorConstraintInterface
{
  constructor(@InjectModel('Team') private readonly teamModel: Model<Team>) {}
  async validate(teams: Team[]) {
    // check if teams are belong to one league only
    const result = await this.teamModel.find({ teams: { $in: teams } });
    if (result.length !== 1) {
      return false;
    }
    return true;
  }

  defaultMessage() {
    return 'one or more team belong already to an other league.';
  }
}

export const IsTeamBelongToOneLeague =
  (options?: ValidationOptions) => (object: Object, propertyName: string) =>
    registerDecorator({
      name: `teamBelongToOneLeague`,
      target: object.constructor,
      propertyName,
      options,
      constraints: [],
      validator: IsTeamBelongToOneLeagueConstraint,
    });
