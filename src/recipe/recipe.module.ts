import { Module } from '@nestjs/common';
import { DishesController } from 'src/recipe/dishes/dishes.controller';
import { ProductsController } from 'src/recipe/products/products.controller';
import { DishService } from 'src/recipe/dishes/dish.service';
import { ProductService } from 'src/recipe/products/product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/recipe/products/product.entity';
import { Dish } from 'src/recipe/dishes/dish.entity';
import { IngredientsController } from './ingredients/ingredients.controller';
import { IngredientService } from 'src/recipe/ingredients/ingredient.service';
import { Ingredient } from 'src/recipe/ingredients/ingredient.entity';
import { IngredientRepository } from 'src/recipe/ingredients/ingredient.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Dish, Ingredient])],
  controllers: [DishesController, ProductsController, IngredientsController],
  providers: [
    DishService,
    ProductService,
    IngredientService,
    IngredientRepository,
  ],
})
export class RecipeModule {}
