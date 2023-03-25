import { IToken } from '@/store/user/user.interface';
import Cookie from 'js-cookie';

import { IAuthResponse } from './../../store/user/user.interface';

enum TokenType {
  access = 'accessToken',
  refresh = 'refreshToken',
}

export const getAccessToken = () => {
  const accessToken = Cookie.get(TokenType.access);
  return accessToken || null;
};

export const getUserFromStorage = () => {
  return JSON.parse(localStorage.getItem('user') || '{}');
};

export const saveTokensStorage = (data: IToken) => {
  Cookie.set(TokenType.access, data.accessToken);
  Cookie.set(TokenType.refresh, data.refreshToken);
};

export const removeFromStorage = () => {
  Cookie.remove(TokenType.access);
  Cookie.remove(TokenType.refresh);
  localStorage.removeItem('user');
};

export const saveToStorage = (data: IAuthResponse) => {
  saveTokensStorage(data);
  localStorage.setItem('user', JSON.stringify(data.user));
};
