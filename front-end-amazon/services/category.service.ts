import { instance } from '@/api/api.interceptor';
import { ICategory } from '@/types/category.interface';

const CATEGORYS = 'categorys';

export const CategoryService = {
  async getAll() {
    return instance<ICategory[]>({
      url: CATEGORYS,
      method: 'GET',
    });
  },

  async getById(id: string | number) {
    return instance<ICategory>({
      url: `${CATEGORYS}/${id}`,
      method: 'GET',
    });
  },

  async getSlug(slug: string) {
    return instance<ICategory>({
      url: `${CATEGORYS}/by-slug/${slug}`,
      method: 'GET',
    });
  },

  async create() {
    return instance<ICategory>({
      url: CATEGORYS,
      method: 'POST',
    });
  },

  async update(id: string | number, name: string) {
    return instance<ICategory>({
      url: `${CATEGORYS}/${id}`,
      method: 'PUT',
      data: { name },
    });
  },

  async remove(id: string | number) {
    return instance<ICategory>({
      url: `${CATEGORYS}/${id}`,
      method: 'DELETE',
    });
  },
};
