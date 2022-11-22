import { Product } from 'src/recipe/products/product.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @OneToMany(() => Product, (product) => product.dish)
  products: Product[];
}
