import { IToken } from '@/store/user/user.interface';
import Cookie from 'js-cookie';

import { IAuthResponse } from './../../store/user/user.interface';

enum TokenType {
  access = 'accessToken',
  refresh = 'refreshToken',
}

export const saveTokensStorage = (data: IToken) => {
  Cookie.set(TokenType.access, data.accessToken);
  Cookie.set(TokenType.refresh, data.refreshToken);
};

export const removeTokensStorage = () => {
  Cookie.remove(TokenType.access);
  Cookie.remove(TokenType.refresh);
};

export const saveToStorage = (data: IAuthResponse) => {
  saveTokensStorage(data);
  localStorage.setItem('user', JSON.stringify(data.user));
};
