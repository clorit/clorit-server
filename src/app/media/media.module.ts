import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';

@Module({
  controllers: [MediaController],
  exports: [MediaService],
  providers: [MediaService],
})
export class MediaModule {}
