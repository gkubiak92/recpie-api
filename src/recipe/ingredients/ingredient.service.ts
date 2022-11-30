import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Ingredient } from 'src/recipe/ingredients/ingredient.entity';
import { IngredientRepository } from 'src/recipe/ingredients/ingredient.repository';

@Injectable()
export class IngredientService {
  constructor(
    @Inject(IngredientRepository)
    private ingredientRepository: IngredientRepository,
  ) {}

  async findOne(id: number): Promise<Ingredient> {
    const ingredient = await this.ingredientRepository.findById(id);
    if (!ingredient) {
      throw new NotFoundException('Ingredient not found');
    }
    return ingredient;
  }
}
