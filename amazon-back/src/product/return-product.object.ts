import { Prisma } from '@prisma/client';
import { returnReviewObject } from '../review/return-review.object';
import { returnCategoryObject } from './../category/return-category.object';

export const returnProductObject: Prisma.ProductSelect = {
  id: true,
  images: true,
  description: true,
  name: true,
  price: true,
  createdAt: true,
  slug: true,
  category: {
    select: returnCategoryObject,
  },
  reviews: {
    select: returnReviewObject,
  },
};

export const returnProductObjectFullest: Prisma.ProductSelect = {
  ...returnProductObject,
  
};
