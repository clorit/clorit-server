import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CelebModule } from '../celeb/celeb.module';
import { BoardController } from './board.controller';
import { Board } from './board.entity';
import { BoardService } from './board.service';

@Module({
  imports: [forwardRef(() => CelebModule), TypeOrmModule.forFeature([Board])],
  exports: [BoardService],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
