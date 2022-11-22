import { Injectable, NotFoundException } from '@nestjs/common';
import { Dish } from 'src/recipe/dishes/dish.entity';
import { CreateDishDto, UpdateDishDTO } from 'src/recipe/dishes/dish.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DishService {
  constructor(
    @InjectRepository(Dish) private dishRepository: Repository<Dish>,
  ) {}

  create(dish: CreateDishDto): Promise<Dish> {
    return this.dishRepository.save(dish);
  }

  getAll(): Promise<Dish[]> {
    return this.dishRepository.find({ relations: ['products'] });
  }

  async getOneById(id: number): Promise<Dish> {
    const dish = await this.dishRepository.findOne({
      where: { id },
      relations: ['products'],
    });
    if (!dish) {
      throw new NotFoundException('Dish not found');
    }

    return dish;
  }

  async update(dish: UpdateDishDTO) {
    await this.getOneById(dish.id);

    return this.dishRepository.update(dish.id, dish);
  }

  async delete(id: number): Promise<Dish> {
    const dishToRemove = await this.getOneById(id);

    return this.dishRepository.remove(dishToRemove);
  }
}
