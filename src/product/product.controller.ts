import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { ProductRepository } from './product.repository';

@Controller('/product')
export class ProductController {
  constructor(private productRepository: ProductRepository) {}

  @Post()
  async createProduct(@Body() product: ProductDto): Promise<any> {
    this.productRepository.save(product);
  }
  @Get()
  async getProducts() {
    return this.productRepository.getAll();
  }
}
