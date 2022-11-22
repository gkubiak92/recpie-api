import { Injectable, NotFoundException } from '@nestjs/common';
import { Dish } from 'src/recipe/dishes/dish.entity';
import { CreateDishDto, UpdateDishDTO } from 'src/dto/dish.dto';

@Injectable()
export class DishService {
  create(dish: CreateDishDto): Promise<Dish> {
    const newDish = new Dish();
    Object.assign(newDish, dish);

    return newDish.save();
  }

  getAll(): Promise<Dish[]> {
    return Dish.find({ relations: ['products'] });
  }

  async getOneById(id: number): Promise<Dish> {
    const dish = await Dish.findOne({ where: { id }, relations: ['products'] });
    if (!dish) {
      throw new NotFoundException('Dish not found');
    }

    return dish;
  }

  async update(dish: UpdateDishDTO): Promise<Dish> {
    const dishToUpdate = await this.getOneById(dish.id);
    Object.assign(dishToUpdate, dish);

    return dishToUpdate.save();
  }

  async delete(id: number): Promise<Dish> {
    const dishToRemove = await this.getOneById(id);

    return dishToRemove.remove();
  }
}
