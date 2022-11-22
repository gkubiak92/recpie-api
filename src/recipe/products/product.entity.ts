import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Dish } from 'src/recipe/dishes/dish.entity';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'varchar' })
  unit: 'kg' | 'g' | 'l' | 'ml' | 'unit';

  @Column({ type: 'decimal' })
  amount: number;

  @ManyToOne(() => Dish, (dish) => dish.products, {
    onDelete: 'CASCADE',
  })
  dish: Dish;
}
