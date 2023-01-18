import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'currency', async: false })
export class IsCurrencyValidator implements ValidatorConstraintInterface {
  private readonly allowedCurrencies = ['USD', 'EUR', 'GBP'];
  async validate(value: string) {
    return this.allowedCurrencies.includes(value.toUpperCase());
  }

  defaultMessage(args: ValidationArguments) {
    return 'currency is not valid.';
  }
}

export const IsCurrency =
  (options?: ValidationOptions) => (object: Object, propertyName: string) =>
    registerDecorator({
      name: `currency`,
      target: object.constructor,
      propertyName,
      options,
      constraints: [],
      validator: IsCurrencyValidator,
    });
