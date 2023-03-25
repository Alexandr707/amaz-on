import { instance } from '@/api/api.interceptor';

const STATISTICS = 'statistics';

export type TypeStatisticsResponce = {
  name: string;
  value: number;
};

export const StatisticsService = {
  async getMain() {
    return instance<TypeStatisticsResponce>({
      url: `${STATISTICS}/main`,
      method: 'GET',
    });
  },
};
