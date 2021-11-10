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
    const { email, name, password } = userDto;

    const user = new User();
    user.email = email;
    user.password = password;
    user.name = name;
    console.log(user.email);
    await this.userRepository.save(user);

    return user;
  }

  async read(id: number): Promise<generalUserResponse> {
    return await this.userRepository.findOne(id);
  }

  async destroy(id: number): Promise<generalUserResponse> {
    const userToDestroy = await this.userRepository.findOne(id);
    return await this.userRepository.remove(userToDestroy);
  }

  async getByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ email: email });
  }

  async getById(id: number): Promise<User | undefined> {
    return await this.userRepository.findOne({ id });
  }
}
