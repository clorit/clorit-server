import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CelebModule } from '../celeb/celeb.module';
import { UserModule } from '../user/user.module';
import { BoardController } from './board.controller';
import { Board } from './board.entity';
import { BoardService } from './board.service';

@Module({
  imports: [
    forwardRef(() => CelebModule),
    forwardRef(() => UserModule),
    TypeOrmModule.forFeature([Board]),
  ],
  exports: [BoardService],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
