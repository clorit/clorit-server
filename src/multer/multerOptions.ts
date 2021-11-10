import { BadRequestException } from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';
import { extname, join } from 'path';
import { v4 as uuid } from 'uuid';
import { diskStorage } from 'multer';

export const multerOptions = {
  fileFilter: (request, file, callback) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
      // 이미지 형식은 jpg, jpeg, png만 허용합니다.
      callback(null, true);
    } else {
      callback(new BadRequestException(), false);
    }
  },

  storage: diskStorage({
    destination: (request, file, callback) => {
      const uploadPath = 'public';

      if (!existsSync(uploadPath)) {
        // public 폴더가 존재하지 않을시, 생성합니다.
        mkdirSync(uploadPath);
      }

      callback(null, uploadPath);
    },
    filename: (request, file, callback) => {
      const name = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
        /[xy]/g,
        function (c) {
          const r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        },
      );
      callback(null, name);
    },
  }),
};

export const createImageURL = (file, type, filename): string => {
  // 파일이 저장되는 경로: 서버주소/public 폴더
  // 위의 조건에 따라 파일의 경로를 생성해줍니다.
  const a = join(__dirname, '../public');
  console.log(a);
  return `./public/${type}/${filename}`;
};

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};

export const editFileName = (req, file, callback) => {
  const name = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    function (c) {
      const r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    },
  );
  const fileExtName = extname(file.originalname);
  callback(null, `${name}${fileExtName}`);
};
