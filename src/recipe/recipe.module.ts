import { Module } from '@nestjs/common';
import { DishesController } from 'src/recipe/dishes/dishes.controller';
import { ProductsController } from 'src/recipe/products/products.controller';
import { DishService } from 'src/recipe/dishes/dish.service';
import { ProductService } from 'src/recipe/products/product.service';

@Module({})
export class RecipeModule {
  controllers: [DishesController, ProductsController];
  providers: [DishService, ProductService];
}
