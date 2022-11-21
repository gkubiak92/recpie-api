import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateDishDto, UpdateDishDTO } from 'src/dto/dish.dto';
import { DishService } from 'src/recipe/dishes/dish.service';

@Controller('dishes')
export class DishesController {
  constructor(private dishService: DishService) {}

  @Get()
  getDishes() {
    return this.dishService.getAll();
  }

  @Get(':id')
  getDish(@Param('id', ParseIntPipe) id: number) {
    return this.dishService.getOneById(id);
  }

  @Post()
  createDish(@Body() dish: CreateDishDto) {
    return this.dishService.create(dish);
  }

  @Put(':id')
  updateDish(
    @Param('id', ParseIntPipe) id: number,
    @Body() dish: UpdateDishDTO,
  ) {
    return this.dishService.update(dish);
  }

  @Delete(':id')
  deleteDish(@Param('id', ParseIntPipe) id: number) {
    return this.dishService.delete(id);
  }
}
