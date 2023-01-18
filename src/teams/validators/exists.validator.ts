import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Model } from 'mongoose';
import { Team } from 'src/teams/team.schema';
import { InjectModel } from '@nestjs/mongoose';

@ValidatorConstraint({ name: 'teamExists', async: false })
@Injectable()
export class IsTeamExistConstraint implements ValidatorConstraintInterface {
  constructor(@InjectModel('Team') private readonly teamModel: Model<Team>) {}
  async validate(teams: Team[]) {
    // check if teams are exist in the database
    const existingTeams = await this.teamModel.find({
      _id: { $in: teams },
    });
    if (existingTeams.length !== teams.length) {
      return false;
    }

    return true;
  }
  defaultMessage() {
    return 'one or more team does not exist.';
  }
}

export const IsTeamExist =
  (options?: ValidationOptions) => (object: Object, propertyName: string) =>
    registerDecorator({
      name: `teamExists`,
      target: object.constructor,
      propertyName,
      options,
      constraints: [],
      validator: IsTeamExistConstraint,
    });
