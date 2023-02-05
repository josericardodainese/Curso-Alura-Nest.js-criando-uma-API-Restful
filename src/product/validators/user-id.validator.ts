import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
@ValidatorConstraint({ async: true })
export class UserIdValidator implements ValidatorConstraintInterface {
  constructor(private userRepository: UserRepository) {}
  async validate(value: any): Promise<boolean> {
    const userWithEmailExists = await this.userRepository.userWithEmailExistis(
      value,
    );
    return userWithEmailExists;
  }
}

export const IsValidUserId = (validationOptions: ValidationOptions) => {
  return (object: object, properties: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: properties,
      options: validationOptions,
      constraints: [],
      validator: UserIdValidator,
    });
  };
};
