import { IsNumber, IsString } from 'class-validator';
import { OmitType } from '@nestjs/mapped-types';

export class UpdateProductDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  unit: 'kg' | 'g' | 'l' | 'ml' | 'unit';

  @IsNumber()
  amount: number;

  @IsNumber()
  dishId: number;
}

export class CreateProductDto extends OmitType(UpdateProductDto, [
  'id',
] as const) {}
