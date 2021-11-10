import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { Celeb } from './celeb/celeb.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { CelebModule } from './celeb/celeb.module';
import { MediaModule } from './media/media.module';
import { BoardController } from './board/board.controller';
import { BoardModule } from './board/board.module';
import { Board } from './board/board.entity';
import { Media } from './media/media.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'password',
      database: 'clorit',
      entities: [User, Celeb, Board, Media],
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    CelebModule,
    MediaModule,
    BoardModule,
    ConfigModule.forRoot({
      envFilePath: 'local.env',
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
      }),
    }),
    BoardModule,
  ],
  controllers: [AppController, BoardController],
  providers: [AppService],
})
export class AppModule {}
