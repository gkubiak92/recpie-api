export interface Product {
  id: number;
  name: string;
  description: string;
  unit: 'kg' | 'g' | 'l' | 'ml' | 'unit';
  amount: number;
  dishId: number;
}
