import { Product } from 'src/recipe/products/product.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/user/user.entity';
import { Ingredient } from 'src/recipe/ingredients/ingredient.entity';

@Entity()
export class Dish extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'decimal' })
  servings: number;

  @Column({ type: 'varchar', nullable: true })
  description?: string;

  @ManyToOne(() => User, (user) => user.dishes, {
    onDelete: 'CASCADE',
  })
  user: User;

  @Column({ type: 'boolean', default: false })
  isPublic: number;

  @OneToMany(() => Ingredient, (ingredient) => ingredient.dish, {
    onDelete: 'CASCADE',
  })
  ingredients: Ingredient[];
}
