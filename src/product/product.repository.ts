import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductRepository {
  private productList = [];

  async save(product) {
    this.productList.push(product);
    console.log(this.productList);
  }

  async getAll() {
    return this.productList;
  }
}
