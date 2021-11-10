import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  BadRequestException,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from 'src/type/board/create-board.dto';
import { Board } from './board.entity';
import { QueryFailedError } from 'typeorm';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}
  @Post()
  async create(@Body() boardDto: CreateBoardDto): Promise<Board> {
    try {
      return await this.boardService.create(boardDto);
    } catch (e) {
      if (e instanceof QueryFailedError) {
        throw new BadRequestException();
      }
      throw e;
    }
  }

  @Get()
  async read(@Body() body: { id: number }): Promise<Board> {
    try {
      return await this.boardService.read(body.id);
    } catch (e) {
      if (e instanceof QueryFailedError) {
        throw new BadRequestException();
      }
    }
  }

  @Delete()
  async destroy(@Body() body: { id: number }): Promise<Board> {
    try {
      return await this.boardService.destroy(body.id);
    } catch (e) {
      if (e instanceof QueryFailedError) {
        throw new BadRequestException();
      }
    }
  }
}
