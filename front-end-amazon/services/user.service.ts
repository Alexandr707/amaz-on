import { instance } from '@/api/api.interceptor';
import { IFullUser, IUser } from '@/types/user.interface';

const USER = 'user';

type TypeData = {
  email: string;
  password?: string;
  name?: string;
  avatarURL?: string;
  phone?: string;
};

export const UserService = {
  async getProfile() {
    return instance<IFullUser>({
      url: `${USER}/profile`,
      method: 'GET',
    });
  },

  async updateProfile(data: TypeData) {
    return instance<IUser>({
      url: `${USER}/profile`,
      method: 'PUT',
      data,
    });
  },

  async toogleFavorites(productId: string | number) {
    return instance<IUser>({
      url: `${USER}/profile/favorites/${productId}`,
      method: 'PATCH',
    });
  },
};
