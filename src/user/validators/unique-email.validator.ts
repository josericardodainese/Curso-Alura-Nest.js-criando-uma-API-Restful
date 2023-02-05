import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserRepository } from '../user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
@ValidatorConstraint({ async: true })
export class UniqueEmailValidador implements ValidatorConstraintInterface {
  constructor(private userRepository: UserRepository) {}

  async validate(value: any): Promise<boolean> {
    const userWithEmailExists = await this.userRepository.userWithEmailExistis(
      value,
    );
    return !userWithEmailExists;
  }
}

export const EmailIsUnique = (validationOptions: ValidationOptions) => {
  return (object: object, properties: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: properties,
      options: validationOptions,
      constraints: [],
      validator: UniqueEmailValidador,
    });
  };
};
