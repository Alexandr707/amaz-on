import { useActions } from '@/hooks/useActions';
import { useAuth } from '@/hooks/useAuth';
import { getAccessToken, getRefreshToken } from '@/services/auth/auth.helper';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { FC, PropsWithChildren, useEffect } from 'react';

import { TypeComponentAuthFields } from './auth-page.types';

const DynamicCheRole = dynamic(() => import('./CheckRole'), { ssr: false });

const AuthProvider: FC<PropsWithChildren<TypeComponentAuthFields>> = ({
  Component: { isOnlyUser },
  children,
}) => {
  const { user } = useAuth();
  const { checkAuth, logout } = useActions();

  const { pathname } = useRouter();

  useEffect(() => {
    const accessToke = getAccessToken();
    if (accessToke) checkAuth();
  }, []);

  useEffect(() => {
    const refreshToken = getRefreshToken();
    if (!refreshToken && user) logout();
  }, [pathname]);

  return isOnlyUser ? (
    <DynamicCheRole Component={{ isOnlyUser }}>{children}</DynamicCheRole>
  ) : (
    <>{children}</>
  );
};

export default AuthProvider;
