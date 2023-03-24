import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PaginationService } from './../pagination/pagination.service';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService, PrismaService, PaginationService],
})
export class ProductModule {}
