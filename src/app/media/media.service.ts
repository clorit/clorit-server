import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SimpleConsoleLogger } from 'typeorm';
import * as fs from 'fs';
import { BoardService } from '../board/board.service';
import { Media } from './media.entity';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,
    @Inject(forwardRef(() => BoardService))
    private readonly boardService: BoardService,
  ) {}

  async uploadFiles(
    files: File[],
    type: string,
    boardId: number,
  ): Promise<Media[]> {
    const generatedFiles: Media[] = [];

    for (const file of files) {
      const mediaDto = {
        name: file['filename'],
        isCeleb: type === 'celeb',
        board: await this.boardService.read(boardId),
      };
      const media = await this.mediaRepository.create(mediaDto);
      await this.mediaRepository.save(media);
      generatedFiles.push(media);
    }
    return generatedFiles;
  }

  async downloadFiles(boardId: number) {
    const board = await this.boardService.read(boardId);

    const cloth = await this.mediaRepository.findOne({
      board: board,
      isCeleb: false,
    });
    const celebs = await this.mediaRepository.find({
      board: board,
      isCeleb: true,
    });
    const files = [];

    console.log(celebs);
    const n = celebs.length + 1;

    const clothPath = `./public/cloth/${cloth.name}`;
    const clothImage = await new Promise<Buffer>((resolve, reject) => {
      fs.readFile(clothPath, {}, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });

    files.push(clothImage);

    for (const celeb of celebs) {
      const celebPath = `./public/celeb/${celeb.name}`;
      const celebImage = await new Promise<Buffer>((resolve, reject) => {
        fs.readFile(celebPath, {}, (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      });
      files.push(celebImage);
    }

    return { count: n, files: files };
  }
}
