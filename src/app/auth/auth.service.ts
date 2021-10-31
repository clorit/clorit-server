import {
  BadRequestException,
  HttpCode,
  Injectable,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/type/user/create-user.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import TokenPayload from './interface/tokenPayload.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(userDto: CreateUserDto) {
    console.log('!');
    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    console.log('?');
    try {
      const createdUser = await this.userService.create({
        ...userDto,
        password: hashedPassword,
      });
      createdUser.password = undefined;
      return createdUser;
    } catch (e) {
      console.log(e);
      throw new BadRequestException();
    }
  }

  async verifyUser(email: string, password: string) {
    try {
      const user = await this.userService.getByEmail(email);
      await this.verifyPassword(password, user.password);
      user.password = undefined;
      return user;
    } catch (e) {
      throw new BadRequestException();
    }
  }

  async verifyPassword(plainPassword: string, hashedPassword: string) {
    const isPasswordMatching = await bcrypt.compare(
      plainPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new BadRequestException();
    }
  }

  public getCookieWithJwtToken(id: number) {
    const payload: TokenPayload = { id };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_EXPIRATION_TIME',
    )}`;
  }
}
