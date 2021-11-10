import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Celeb } from '../celeb/celeb.entity';
import { Media } from '../media/media.entity';
import { User } from '../user/user.entity';

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

  @ManyToOne(() => User, (user) => user.boards, {
    cascade: true,
  })
  @ApiProperty({ type: () => User })
  user: User;

  @OneToMany(() => Media, (media) => media.board)
  @ApiProperty({ type: () => Media })
  medias: Media[];
}
