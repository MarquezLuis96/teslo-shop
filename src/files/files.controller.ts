import express from 'express';
import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFiler, fileNamer } from './helpers';
import { diskStorage } from 'multer';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService,
  ) {}

  @Get('product/:imageName')
  findProductImage(
    @Res() res: express.Response,
    @Param('imageName') imageName: string,
  ) {
    console.log('imageName: ', { imageName });
    const path = this.filesService.getStaticProductImage(imageName);
    console.log(path);

    // return path;

    // res.status(403).json({
    //   ok: false,
    //   path: path,
    // });

    res.sendFile(path);
  }

  @Post('product')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileFiler,
      // limits: {
      //   fileSize: 1000,
      // },
      storage: diskStorage({
        destination: './static/products',
        filename: fileNamer,
      }),
    }),
  )
  uploadProductFile(@UploadedFile() file: Express.Multer.File) {
    console.log('File in controller: ', { fileInController: file });

    if (!file) {
      throw new BadRequestException('Make Sure that the file is an image ');
    }

    const secureUrl = `${this.configService.get('HOST_API')}/files/product/${file.filename}`;

    return {
      fileName: secureUrl,
    };
  }
}
