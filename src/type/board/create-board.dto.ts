import { IsString, IsNumber } from 'class-validator';

export class CreateBoardDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly brand: string;

  @IsString()
  readonly mainCategory: string;

  @IsString()
  readonly subCategory: string;

  @IsString()
  readonly color: string;

  @IsNumber()
  readonly price: number;

  @IsString()
  readonly link: string;

  @IsNumber()
  readonly celebName: string;
}
