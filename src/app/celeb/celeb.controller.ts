import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Request,
} from '@nestjs/common';
import { CelebService } from './celeb.service';
import { Celeb } from './celeb.entity';
import { QueryFailedError } from 'typeorm';
import { CreateCelebDto } from 'src/type/celeb/create-celeb.dto';

@Controller('celeb')
export class CelebController {
  constructor(private readonly celebService: CelebService) {}

  @Post()
  async create(@Body() celebDto: CreateCelebDto): Promise<Celeb> {
    try {
      return await this.celebService.create(celebDto);
    } catch (e) {
      if (e instanceof QueryFailedError) {
        throw new BadRequestException();
      }
      throw e;
    }
  }

  @Get()
  async read(@Body() body: { name: string }): Promise<Celeb> {
    try {
      return await this.celebService.read(body.name);
    } catch (e) {
      if (e instanceof QueryFailedError) {
        throw new BadRequestException();
      }
    }
  }

  @Delete()
  async destroy(@Body() body: { name: string }): Promise<Celeb> {
    try {
      return await this.celebService.destroy(body.name);
    } catch (e) {
      if (e instanceof QueryFailedError) {
        throw new BadRequestException();
      }
    }
  }
}
