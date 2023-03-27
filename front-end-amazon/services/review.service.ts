import { instance } from '@/api/api.interceptor';
import { IReview } from '@/types/review.interface';

const REVIEWS = 'reviews';

type TypeData = {
  text: string;
  rating: number;
};

export const ReviewService = {
  async getAll() {
    return instance<IReview[]>({
      url: REVIEWS,
      method: 'GET',
    });
  },

  async getAverageByProduct(productId: number | string) {
    return instance<number>({
      url: `${REVIEWS}/avarage-by-product/${productId}`,
      method: 'GET',
    });
  },

  async leave(productId: number, data: TypeData) {
    return instance<IReview>({
      url: `${REVIEWS}/leave/${productId}`,
      method: 'POST',
      data,
    });
  },
};
