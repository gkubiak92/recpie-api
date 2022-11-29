import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from 'src/recipe/products/product.entity';
import { Dish } from 'src/recipe/dishes/dish.entity';

@Entity()
export class Ingredient extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal' })
  amount: number;

  @ManyToOne(() => Product, (product) => product.ingredients)
  product: Product;

  @ManyToOne(() => Dish, (dish) => dish.ingredients)
  dish: Dish;
}
