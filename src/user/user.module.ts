import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UniqueEmailValidador } from './validators/unique-email.validator';

@Module({
  controllers: [UserController],
  exports: [UserRepository],
  providers: [UserRepository, UniqueEmailValidador],
})
export class UserModule {}
