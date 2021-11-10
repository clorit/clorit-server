import { ApiProperty } from '@nestjs/swagger';
import { memoryUsage } from 'process';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Board } from '../board/board.entity';

@Entity()
export class Celeb {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  count!: number;

  @OneToMany(() => Board, (board) => board.celeb)
  @ApiProperty({ type: () => Board })
  boards: Board[];
}
