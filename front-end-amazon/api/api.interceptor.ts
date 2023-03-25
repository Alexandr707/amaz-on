import { getAccessToken } from '@/services/auth/auth.helper';
import axios, { AxiosError } from 'axios';

import { removeFromStorage } from './../services/auth/auth.helper';
import { AuthService } from './../services/auth/auth.service';
import { errorCatch, getContentType } from './api.helper';

export const instance = axios.create({
  baseURL: process.env.SERVER_URL,
  headers: getContentType(),
});

instance.interceptors.request.use(config => {
  const accessToken = getAccessToken();

  if (config.headers && accessToken)
    config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

AxiosError<{ __isRetry?: boolean }>;

instance.interceptors.response.use(
  config => config,
  async err => {
    const originalRequest = err.config;

    if (
      (err.response?.status === 401 ||
        errorCatch(err) === 'jwt expired' ||
        errorCatch(err) === 'jwt must be provided') &&
      err.config &&
      !err.config.__isRetry
    ) {
      originalRequest.__isRetry = true;
      try {
        await AuthService.getNewToken();
        return instance.request(originalRequest);
      } catch (error) {
        if (errorCatch(error) == 'jwt expired') {
          removeFromStorage();
        }
      }
    }

    throw err;
  },
);
