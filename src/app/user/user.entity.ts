import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { OmitType } from '@nestjs/swagger';

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
}

export class UserWithoutPW extends OmitType(User, ['password'] as const) {}
