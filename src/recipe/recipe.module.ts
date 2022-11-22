import { Module } from '@nestjs/common';
import { DishesController } from 'src/recipe/dishes/dishes.controller';
import { ProductsController } from 'src/recipe/products/products.controller';
import { DishService } from 'src/recipe/dishes/dish.service';
import { ProductService } from 'src/recipe/products/product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/recipe/products/product.entity';
import { Dish } from 'src/recipe/dishes/dish.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Dish])],
  controllers: [DishesController, ProductsController],
  providers: [DishService, ProductService],
})
export class RecipeModule {}
