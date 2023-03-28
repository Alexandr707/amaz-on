import { instance } from '@/api/api.interceptor';
import { IProduct, TypePaginationProducts } from '@/types/product.interface';

import {
  PRODUCTS,
  TypeProductData,
  TypeProductDataFilter
} from './product.types';

export const ProductService = {
  async getAll(queryData: TypeProductDataFilter = {}) {
    const { data } = await instance<TypePaginationProducts>({
      url: PRODUCTS,
      method: 'GET',
      params: queryData,
    });

    return data;
  },

  async getSimilar(productId: number | string) {
    return instance<IProduct[]>({
      url: `${PRODUCTS}/similar/${productId}`,
      method: 'GET',
    });
  },

  async getBySlug(slug: string) {
    return instance<IProduct>({
      url: `${PRODUCTS}/by-slug/${slug}`,
      method: 'GET',
    });
  },

  async getById(id: string | number) {
    return instance<IProduct>({
      url: `${PRODUCTS}/${id}`,
      method: 'GET',
    });
  },

  async getByCategory(categorySlug: string) {
    return instance<IProduct[]>({
      url: `${PRODUCTS}/by-category/${categorySlug}`,
      method: 'GET',
    });
  },

  async create() {
    return instance<IProduct>({
      url: PRODUCTS,
      method: 'POST',
    });
  },

  async update(id: string | number, data: TypeProductData) {
    return instance<IProduct>({
      url: `${PRODUCTS}/${id}`,
      method: 'PUT',
      data,
    });
  },

  async remove(id: string | number) {
    return instance<IProduct>({
      url: `${PRODUCTS}/${id}`,
      method: 'DELETE',
    });
  },
};
