import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Dish } from 'src/dishes/dish';
import { CreateDishDto, UpdateDishDTO } from 'src/dto/dish.dto';

@Controller('dishes')
export class DishesController {
  trackId = 1;
  dishes: Dish[] = [
    {
      id: this.trackId++,
      name: 'Pizza',
      servings: 1,
      description: 'A delicious pizza',
    },
  ];

  @Get()
  getDishes(): Dish[] {
    return this.dishes;
  }

  @Get(':id')
  getDish(@Param('id', ParseIntPipe) id: number): Dish {
    const dish = this.dishes.find((dish) => dish.id === id);

    if (!dish) {
      throw new NotFoundException('Dish not found');
    }

    return dish;
  }

  @Post()
  createDish(@Body() dish: CreateDishDto): Dish {
    const createdDish = {
      id: this.trackId++,
      ...dish,
    };
    this.dishes.push(createdDish);
    return createdDish;
  }

  @Put(':id')
  updateDish(
    @Param('id', ParseIntPipe) id: number,
    @Body() dish: UpdateDishDTO,
  ): Dish {
    const dishIndex = this.dishes.findIndex((dish) => dish.id === id);

    if (dishIndex === -1) {
      throw new NotFoundException('Dish not found');
    }

    this.dishes[dishIndex] = {
      ...this.dishes[dishIndex],
      ...dish,
    };

    return this.dishes[dishIndex];
  }

  @Delete(':id')
  deleteDish(@Param('id', ParseIntPipe) id: number): Dish[] {
    const dishIndex = this.dishes.findIndex((dish) => dish.id === id);

    if (dishIndex === -1) {
      throw new NotFoundException('Dish not found');
    }

    this.dishes.splice(dishIndex, 1);

    return this.dishes;
  }
}
