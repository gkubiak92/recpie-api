import { Module } from '@nestjs/common';
import { DishesController } from './dishes/dishes.controller';
import { ProductsController } from './products/products.controller';
import { DishService } from 'src/dishes/dish.service';
import { ProductService } from 'src/products/product.service';

@Module({
  imports: [],
  controllers: [DishesController, ProductsController],
  providers: [DishService, ProductService],
})
export class AppModule {}
