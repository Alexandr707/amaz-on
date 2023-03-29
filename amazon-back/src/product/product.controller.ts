import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UsePipes
} from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common/pipes';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { GetAllProductsDto } from './dto/get-all-product.dto';
import { ProductDto } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UsePipes(new ValidationPipe())
  @Get()
  async getAll(@Query() queryDto: GetAllProductsDto) {
    return this.productService.getAll(queryDto);
  }

  @Get('similar/:id')
  async getSimilar(@Param('id') id: string) {
    return this.productService.getSimilar(+id);
  }

  @Get('by-slug/:id')
  async getProductBySlug(@Param('id') id: string) {
    return this.productService.bySlug(id);
  }

  @Get('by-category/:categorySlug')
  async getProductByCategory(@Param('categorySlug') categorySlug: string) {
    return this.productService.byCategory(categorySlug);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Post()
  async createProduct() {
    return this.productService.create();
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Put(':id')
  async updateProduct(@Param('id') id: string, @Body() dto: ProductDto) {
    return this.productService.update(+id, dto);
  }

  @HttpCode(200)
  @Auth()
  @Delete(':id')
  async removeProduct(@Param('id') id: string) {
    return this.productService.remove(+id);
  }

  @Get(':id')
  @Auth()
  async getProductById(@Param('id') id: string) {
    return this.productService.byId(+id);
  }
}
