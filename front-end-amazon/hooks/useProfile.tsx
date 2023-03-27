import { UserService } from '@/services/user.service';
import { IFullUser } from '@/types/user.interface';
import { useQuery } from '@tanstack/react-query';

export const useProfile = () => {
  const { data } = useQuery(['get profile'], () => UserService.getProfile(), {
    select: ({ data }) => data,
  });

  return { profile: data || ({} as IFullUser) };
};
