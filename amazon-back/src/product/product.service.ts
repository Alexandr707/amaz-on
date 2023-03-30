import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PaginationService } from './../pagination/pagination.service';
import { PrismaService } from './../prisma.service';
import { generateSlug } from './../utils/generate-slug';
import { EnumProductSort, GetAllProductsDto } from './dto/get-all-product.dto';
import { ProductDto } from './dto/product.dto';
import { returnProductObject } from './return-product.object';

@Injectable()
export class ProductService {
  constructor(
    private prisma: PrismaService,
    private paginationService: PaginationService,
  ) {}

  async getAll(dto: GetAllProductsDto = {}) {
    const { sort, searchTerm } = dto;

    const prismaSort: Prisma.ProductOrderByWithRelationInput[] = [];

    if (sort === EnumProductSort.LOW_PRICE) {
      prismaSort.push({ price: 'asc' });
    } else if (sort === EnumProductSort.HIGH_PRICE) {
      prismaSort.push({ price: 'desc' });
    } else if (sort === EnumProductSort.OLDEST) {
      prismaSort.push({ createdAt: 'asc' });
    } else {
      prismaSort.push({ createdAt: 'desc' });
    }

    const prismaSearchTermFilter: Prisma.ProductWhereInput = searchTerm
      ? {
          OR: [
            {
              category: {
                name: {
                  contains: searchTerm,
                  mode: 'insensitive',
                },
              },
            },
            {
              name: {
                contains: searchTerm,
                mode: 'insensitive',
              },
            },
            {
              description: {
                contains: searchTerm,
                mode: 'insensitive',
              },
            },
          ],
        }
      : {};

    const { perPage, skip } = this.paginationService.getPagination(dto);

    const products = await this.prisma.product.findMany({
      where: prismaSearchTermFilter,
      orderBy: prismaSort,
      skip,
      take: perPage,
      select:returnProductObject
    });

    return {
      products,
      length: await this.prisma.product.count({ where: prismaSearchTermFilter }),
    };
  }

  async create() {
    const product = await this.prisma.product.create({
      data: {
        name: '',
        price: 0,
        slug: '',
        description: '',
      },
    });

    return product.id;
  }

  async update(id: number, dto: ProductDto) {
    const { description, name, images, categoryId, price } = dto;

    return this.prisma.product.update({
      where: { id },
      data: {
        description,
        name,
        images,
        price,
        slug: generateSlug(name),
        category: {
          connect: {
            id: categoryId,
          },
        },
      },
    });
  }

  async byId(id: number) {
    const product = await this.prisma.product.findUnique({
      where: {
        id,
      },
      select: returnProductObject,
    });

    if (!product) throw new NotFoundException('Produc not fouund');

    return product;
  }

  async bySlug(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: {
        slug,
      },
      select: returnProductObject,
    });

    if (!product) throw new NotFoundException('Produc not fouund');

    return product;
  }

  async byCategory(categorySlug: string) {
    const product = await this.prisma.product.findMany({
      where: {
        category: {
          slug: categorySlug,
        },
      },
      select: returnProductObject,
    });

    if (!product) throw new NotFoundException('Produc not fouund');

    return product;
  }

  async getSimilar(id: number) {
    const currentProduct = await this.prisma.product.findUnique({
      where: {
        id,
      },
      select: returnProductObject,
    });

    if (!currentProduct) throw new NotFoundException('Produc not fouund');

    const products = await this.prisma.product.findMany({
      where: {
        category: {
          name: currentProduct.category.name,
        },
        NOT: {
          id: currentProduct.id,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return products;
  }

  async remove(id: number) {
    return this.prisma.product.delete({ where: { id } });
  }
}
