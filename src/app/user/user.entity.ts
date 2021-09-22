import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { OmitType } from '@nestjs/swagger';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  email!: string;

  @Column()
  username!: string;

  @Column()
  password!: string;
}

export class UserWithoutPW extends OmitType(User, ['password'] as const) {}
