import { ICategory } from './category.interface';
import { IReview } from './review.interface';

export interface IProduct {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  rating:number;
  reviews: IReview[];
  images: string[];
  createdAt: string;
  category: ICategory;
}

export interface IProductDetaile {
  product: IProduct;
}

export type TypeProducts = {products: IProduct[]}

export type TypePaginationProducts = {products: IProduct[],length: number}

