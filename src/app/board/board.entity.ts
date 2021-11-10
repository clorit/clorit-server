import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Celeb } from '../celeb/celeb.entity';

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  brand!: string;

  @Column()
  mainCategory!: string;

  @Column()
  subCategory!: string;

  @Column()
  color!: string;

  @Column()
  price!: number;

  @Column()
  link!: string;

  @ManyToOne(() => Celeb, (celeb) => celeb.boards, {
    cascade: true,
  })
  @ApiProperty({ type: () => Celeb })
  celeb: Celeb;
}
