import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CelebController } from './celeb.controller';
import { Celeb } from './celeb.entity';
import { CelebService } from './celeb.service';

@Module({
  imports: [TypeOrmModule.forFeature([Celeb])],
  exports: [CelebService],
  controllers: [CelebController],
  providers: [CelebService],
})
export class CelebModule {}
