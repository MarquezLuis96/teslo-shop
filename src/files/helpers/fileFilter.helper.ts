import { BadRequestException } from '@nestjs/common';

export const fileFiler = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: Function,
) => {
  console.log('fileFilter - file: ', { file });
  if (!file) return callback(new BadRequestException('File is empty'), false);

  const fileExtesion = file.mimetype.split('/')[1];
  console.log('FILE EXTENSION: ', fileExtesion);
  const validExtensions = ['jpg', 'jpeg', 'png', 'gif'];

  if (!validExtensions.includes(fileExtesion)) {
    return callback(new BadRequestException('Invalid file type'), false);
  }

  return callback(null, true);
};
