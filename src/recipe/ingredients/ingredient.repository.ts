import { DataSource } from 'typeorm';
import { Ingredient } from 'src/recipe/ingredients/ingredient.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IngredientRepository {
  constructor(private dataSource: DataSource) {}

  async findById(id: number): Promise<Ingredient> {
    return this.dataSource
      .getRepository(Ingredient)
      .createQueryBuilder('ingredient')
      .innerJoinAndSelect('ingredient.dish', 'dish')
      .innerJoinAndSelect('ingredient.product', 'product')
      .where('ingredient.id = :id', { id })
      .getOne();
  }
}
