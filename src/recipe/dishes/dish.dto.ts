import { IsNumber, IsOptional, IsString } from 'class-validator';
import { OmitType } from '@nestjs/mapped-types';

export class UpdateDishDTO {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsNumber()
  servings: number;

  @IsString()
  @IsOptional()
  description?: string;
}

export class CreateDishDto extends OmitType(UpdateDishDTO, ['id'] as const) {}
