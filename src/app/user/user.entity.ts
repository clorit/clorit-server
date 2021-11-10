import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Board } from '../board/board.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  email!: string;

  @Column()
  name!: string;

  @Column()
  password!: string;

  @OneToMany(() => Board, (board) => board.user)
  @ApiProperty({ type: () => Board })
  boards: Board[];
}

export class UserWithoutPW extends OmitType(User, ['password'] as const) {}
