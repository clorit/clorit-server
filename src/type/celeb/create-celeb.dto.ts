import { IsString } from 'class-validator';

export class CreateCelebDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly group: string;
}
