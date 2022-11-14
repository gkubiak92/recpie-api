import { Module } from '@nestjs/common';
import { DishesController } from './dishes/dishes.controller';
import { ProductsController } from './products/products.controller';

@Module({
  imports: [],
  controllers: [DishesController, ProductsController],
  providers: [],
})
export class AppModule {}
