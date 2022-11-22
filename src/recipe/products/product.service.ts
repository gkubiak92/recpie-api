import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from 'src/recipe/products/product.entity';
import { CreateProductDto, UpdateProductDto } from 'src/dto/product.dto';
import { DishService } from 'src/recipe/dishes/dish.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    private dishService: DishService,
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  getAll(): Promise<Product[]> {
    return this.productRepository.find({ relations: ['dish'] });
  }

  async getOneById(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['dish'],
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  getAllByDishId(dishId: number): Promise<Product[]> {
    return this.productRepository.find({
      where: { dish: { id: dishId } },
      relations: ['dish'],
    });
  }

  async create(product: CreateProductDto): Promise<Product> {
    const newProduct = this.productRepository.create(product);
    newProduct.dish = await this.dishService.getOneById(product.dishId);
    return this.productRepository.save(newProduct);
  }

  async update(product: UpdateProductDto) {
    await this.getOneById(product.id);
    return this.productRepository.update(product.id, product);
  }

  async delete(productId: number): Promise<Product> {
    const productToRemove = await this.getOneById(productId);
    return this.productRepository.remove(productToRemove);
  }
}
