import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { IngredientService } from 'src/recipe/ingredients/ingredient.service';

@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ingredientService.findOne(id);
  }
}
