import { BadRequestException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

export const fileNamer = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: Function,
) => {
  if (!file) return callback(new BadRequestException('File is empty'), false);

  const fileNameLowered = file.originalname
    ?.split('.')?.[0]
    ?.toLowerCase()
    ?.replaceAll(' ', '_');
  const fileExtension = file.mimetype.split('/')[1];

  const fileName = `${fileNameLowered}_${uuidv4()}.${fileExtension}`;

  return callback(null, fileName);
};
