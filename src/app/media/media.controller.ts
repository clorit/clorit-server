import {
  BadRequestException,
  Controller,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { string } from 'joi';
import { MediaService } from './media.service';
import { editFileName, imageFileFilter } from 'src/multer/multerOptions';
import { diskStorage } from 'multer';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('/celeb')
  @UseInterceptors(
    FilesInterceptor('image', 20, {
      storage: diskStorage({
        destination: './public/celeb',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadCeleb(@UploadedFiles() files: File[]) {
    try {
      console.log(files);
      return await this.mediaService.uploadFiles(files, 'celeb');
    } catch (e) {
      console.log(e);
      throw new BadRequestException();
    }
  }

  @Post('/cloth')
  @UseInterceptors(
    FilesInterceptor('image', 20, {
      storage: diskStorage({
        destination: './public/cloth',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadCloth(@UploadedFiles() files: File[]) {
    try {
      console.log(files);
      return await this.mediaService.uploadFiles(files, 'cloth');
    } catch (e) {
      console.log(e);
      throw new BadRequestException();
    }
  }
}
