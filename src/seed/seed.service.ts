import { Injectable } from '@nestjs/common';
import { ProductsService } from '.././products/products.service';
import { initialData } from './data/seed-data';

@Injectable()
export class SeedService {
  constructor(private readonly productsService: ProductsService) {}

  private async insertNewProducts() {
    await this.productsService.deleteAllProducts();

    const products = initialData.products;

    const insertPromises = products.map((product) =>
      this.productsService.create(product),
    );
    /*const results = */ await Promise.all(insertPromises);
    // console.log('Results: ', results);

    return true;
  }

  async runSeed() {
    await this.insertNewProducts();
    return 'SEED EXECUTED';
  }
}
