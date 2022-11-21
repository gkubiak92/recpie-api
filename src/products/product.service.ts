import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Product } from 'src/products/product';
import { CreateProductDto } from 'src/dto/product.dto';
import { DishService } from 'src/dishes/dish.service';

@Injectable()
export class ProductService {
  private trackId = 1;
  private products: Product[] = [];

  constructor(
    @Inject(forwardRef(() => DishService))
    private dishService: DishService,
  ) {}

  getAll(): readonly Product[] {
    return this.products;
  }

  getOneById(productId: number): Product {
    const product = this.products.find((product) => product.id === productId);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  getAllByDishId(dishId: number): Product[] {
    return this.products.filter((product) => product.dishId === dishId);
  }

  create(product: CreateProductDto): Product {
    this.dishService.getOneById(product.dishId);
    const createdProduct = {
      id: this.trackId++,
      ...product,
    };
    this.products.push(createdProduct);
    return createdProduct;
  }

  update(product: Product): Product {
    const productToUpdate = this.getOneById(product.id);
    Object.assign(productToUpdate, product);

    return productToUpdate;
  }

  delete(productId: number): { productId: number } {
    this.getOneById(productId);
    this.products = this.products.filter((product) => product.id !== productId);
    return { productId };
  }
}
