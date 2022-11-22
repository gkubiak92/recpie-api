import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Product } from 'src/recipe/products/product.entity';
import { CreateProductDto, UpdateProductDto } from 'src/dto/product.dto';
import { DishService } from 'src/recipe/dishes/dish.service';

@Injectable()
export class ProductService {
  constructor(
    @Inject(forwardRef(() => DishService))
    private dishService: DishService,
  ) {}

  getAll(): Promise<Product[]> {
    return Product.find();
  }

  async getOneById(id: number): Promise<Product> {
    const product = await Product.findOneBy({ id });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }
  //
  // getAllByDishId(dishId: number): Promise<Product[]> {
  //   return Product.find({ where: { dish } });
  // }

  async create(product: CreateProductDto): Promise<Product> {
    const newProduct = new Product();
    Object.assign(newProduct, product);
    newProduct.dish = await this.dishService.getOneById(product.dishId);
    return newProduct.save();
  }

  async update(product: UpdateProductDto): Promise<Product> {
    const productToUpdate = await this.getOneById(product.id);
    Object.assign(productToUpdate, product);

    return productToUpdate.save();
  }

  async delete(productId: number): Promise<Product> {
    const productToRemove = await this.getOneById(productId);
    return productToRemove.remove();
  }
}
