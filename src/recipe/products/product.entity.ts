import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Ingredient } from 'src/recipe/ingredients/ingredient.entity';

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

  @OneToMany(() => Ingredient, (ingredient) => ingredient.product, {
    onDelete: 'CASCADE',
  })
  ingredients: Ingredient[];
}
