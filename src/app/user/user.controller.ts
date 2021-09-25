import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Request,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from 'src/type/user/create-user.dto';
import { UserService } from './user.service';
import { User } from './user.entity';
import { generalUserResponse } from 'src/type/user/user.resp';
import { QueryFailedError } from 'typeorm';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() userDto: CreateUserDto): Promise<generalUserResponse> {
    try {
      return await this.userService.create(userDto);
    } catch (e) {
      if (e instanceof QueryFailedError) {
        throw new BadRequestException();
      }
      throw e;
    }
  }

  @Get()
  @ApiOkResponse({ type: generalUserResponse })
  async read(@Request() req): Promise<generalUserResponse> {
    try {
      console.log(req.id);
      return await this.userService.read(req.id);
    } catch (e) {
      if (e instanceof QueryFailedError) {
        throw new BadRequestException();
      }
    }
  }

  @Delete()
  async destroy(@Request() req): Promise<generalUserResponse> {
    try {
      return await this.userService.destroy(req.user);
    } catch (e) {
      if (e instanceof QueryFailedError) {
        throw new BadRequestException();
      }
    }
  }
}
