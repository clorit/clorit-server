import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardModule } from '../board/board.module';
import { MediaController } from './media.controller';
import { Media } from './media.entity';
import { MediaService } from './media.service';

@Module({
  imports: [forwardRef(() => BoardModule), TypeOrmModule.forFeature([Media])],
  controllers: [MediaController],
  exports: [MediaService],
  providers: [MediaService],
})
export class MediaModule {}
