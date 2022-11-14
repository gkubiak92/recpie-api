import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Product } from 'src/products/product';
import { CreateProductDto, UpdateProductDto } from 'src/dto/product.dto';

@Controller('products')
export class ProductsController {
  trackId = 1;
  products: Product[] = [];

  @Get()
  getProducts(): Product[] {
    return this.products;
  }

  @Get(':id')
  getProduct(@Param('id', ParseIntPipe) id: number): Product {
    const product = this.products.find((product) => product.id === +id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  @Post()
  createProduct(@Body() product: CreateProductDto): Product {
    const createdProduct = {
      id: this.trackId++,
      ...product,
    };
    this.products.push(createdProduct);
    return createdProduct;
  }

  @Put(':id')
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() product: UpdateProductDto,
  ): Product {
    const productIndex = this.products.findIndex(
      (product) => product.id === id,
    );

    if (productIndex === -1) {
      throw new NotFoundException('Product not found');
    }

    this.products[productIndex] = {
      ...this.products[productIndex],
      ...product,
    };

    return this.products[productIndex];
  }

  @Delete(':id')
  deleteProduct(@Param('id', ParseIntPipe) id: number): Product[] {
    const productIndex = this.products.findIndex(
      (product) => product.id === id,
    );

    if (productIndex === -1) {
      throw new NotFoundException('Product not found');
    }

    this.products.splice(productIndex, 1);

    return this.products;
  }
}
