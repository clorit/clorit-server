import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Get,
  Request,
} from '@nestjs/common';
import { CreateUserDto } from 'src/type/user/create-user.dto';
import { UserService } from './user.service';
import { User } from './user.entity';
import { generalUserResponse } from 'src/type/user/user.resp';
import { QueryFailedError } from 'typeorm';

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
  async read(@Request() req): Promise<generalUserResponse> {
    try {
      return await this.userService.read(req.user);
    } catch (e) {
      if (e instanceof QueryFailedError) {
        throw new BadRequestException();
      }
      throw e;
    }
  }
}
