import { instance } from '@/api/api.interceptor';
import Cookie from 'js-cookie';

import { getContentType } from './../../api/api.helper';
import {
  IAuthResponse,
  IEmailPassword
} from './../../store/user/user.interface';
import { saveToStorage } from './auth.helper';

export const AuthService = {
  async main(type: 'login' | 'register', data: IEmailPassword) {
    const response = await instance<IAuthResponse>({
      url: `/auth/${type}`,
      method: 'POST',
      data,
    });

    if (response.data.accessToken) saveToStorage(response.data);

    return response.data;
  },

  async getNewToken() {
    const refreshToken = Cookie.get('refreshToken');

    const response = await instance.post<string, { data: IAuthResponse }>(
      process.env.SERVER_URL + '/auth/login/access-token',
      { refreshToken },
      { headers: getContentType() },
    );

    if (response.data.accessToken) saveToStorage(response.data);

    return response;
  },
};
