import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository';
import { UserIdValidator } from './validators/user-id.validator';

@Module({
  controllers: [ProductController],
  imports: [UserModule],
  providers: [ProductRepository, UserIdValidator],
})
export class ProductModule {}
