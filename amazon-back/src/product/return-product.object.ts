import { Prisma } from '@prisma/client';
import { returnReviewObject } from '../review/return-review.object';
import { returnCategoryObject } from './../category/return-category.object';

export const returnProductobject: Prisma.ProductSelect = {
  id: true,
  images: true,
  description: true,
  name: true,
  price: true,
  createdAt: true,
  slug: true,
};

export const returnProductobjectFullest: Prisma.ProductSelect = {
  ...returnProductobject,
  reviews: {
    select: returnReviewObject,
  },
  category: {
    select: returnCategoryObject,
  },
};
