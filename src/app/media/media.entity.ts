import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Board } from '../board/board.entity';

@Entity()
export class Media {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  isCeleb!: boolean;

  @ManyToOne(() => Board, (board) => board.medias)
  @ApiProperty({ type: () => Board })
  board: Board;
}
