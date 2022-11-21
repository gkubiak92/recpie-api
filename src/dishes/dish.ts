import { Product } from 'src/products/product';

export interface Dish {
  id: number;
  name: string;
  servings: number;
  description?: string;
  products: Product[];
}
