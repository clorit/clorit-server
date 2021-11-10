import {
  BadRequestException,
  Body,
  Controller,
  Get,
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

  @Post('/celeb/:boardId')
  @UseInterceptors(
    FilesInterceptor('image', 20, {
      storage: diskStorage({
        destination: './public/celeb',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadCeleb(
    @Param('boardId') boardId: number,
    @UploadedFiles() files: File[],
  ) {
    try {
      console.log(files);
      return await this.mediaService.uploadFiles(files, 'celeb', boardId);
    } catch (e) {
      console.log(e);
      throw new BadRequestException();
    }
  }

  @Post('/cloth/:boardId')
  @UseInterceptors(
    FilesInterceptor('image', 20, {
      storage: diskStorage({
        destination: './public/cloth',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadCloth(
    @Param('boardId') boardId: number,
    @UploadedFiles() files: File[],
  ) {
    try {
      return await this.mediaService.uploadFiles(files, 'cloth', boardId);
    } catch (e) {
      console.log(e);
      throw new BadRequestException();
    }
  }

  @Get('/download/:boardId')
  async download(@Param('boardId') boardId: number) {
    try {
      return await this.mediaService.downloadFiles(boardId);
    } catch (e) {
      console.log(e);
      throw new BadRequestException();
    }
  }
}
