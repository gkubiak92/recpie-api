import { Injectable, NotFoundException } from '@nestjs/common';
import { Dish } from 'src/recipe/dishes/dish';
import { CreateDishDto, UpdateDishDTO } from 'src/dto/dish.dto';
import { ProductService } from 'src/recipe/products/product.service';

@Injectable()
export class DishService {
  private trackId = 1;
  private dishes: Dish[] = [
    {
      id: this.trackId++,
      name: 'Pizza',
      servings: 1,
      description: 'A delicious pizza',
      products: [],
    },
  ];

  constructor(private productService: ProductService) {}

  create(dish: CreateDishDto): Dish {
    const createdDish = {
      id: this.trackId++,
      products: [],
      ...dish,
    };
    this.dishes.push(createdDish);
    return createdDish;
  }

  getAll(): readonly Dish[] {
    return this.dishes.map((dish) => ({
      ...dish,
      products: this.productService.getAllByDishId(dish.id),
    }));
  }

  getOneById(dishId: number): Dish {
    const dish = this.dishes.find((dish) => dish.id === dishId);

    if (!dish) {
      throw new NotFoundException('Dish not found');
    }

    return { ...dish, products: this.productService.getAllByDishId(dishId) };
  }

  update(dish: UpdateDishDTO): Dish {
    const dishToUpdate = this.getOneById(dish.id);
    Object.assign(dishToUpdate, dish);

    return dishToUpdate;
  }

  delete(dishId: number): { dishId: number } {
    this.getOneById(dishId);
    this.dishes = this.dishes.filter((dish) => dish.id !== dishId);
    return { dishId };
  }
}
