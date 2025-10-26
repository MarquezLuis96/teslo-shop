import { BadRequestException, Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FilesService {
  getStaticProductImage(imageName: string) {
    const path = join(__dirname, '../../static/products', imageName);

    if (!existsSync(path))
      throw new BadRequestException(
        `No product found with image name ${imageName}`,
      );

    return `C:/Users/lamc1/OneDrive/Documents/Dev_Personal/Nest.Js/01_Backend_con_Nest.js/04_teslo-shop/teslo-shop/static/products//${imageName}`;
  }
}
