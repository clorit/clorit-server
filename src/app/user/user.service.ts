import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/type/user/create-user.dto';
import { generalUserResponse } from 'src/type/user/user.resp';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(userDto: CreateUserDto): Promise<User> {
    const { email, username, password } = userDto;

    const user = new User();
    user.email = email;
    user.password = password;
    user.username = username;

    await this.userRepository.save(user);

    user.password = undefined;

    return user;
  }

  async read(user: User): Promise<generalUserResponse> {
    return await this.userRepository.findOne(user.id);
  }
}
