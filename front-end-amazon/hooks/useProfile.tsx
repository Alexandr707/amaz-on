import { errorCatch } from '@/api/api.helper';
import { UserService } from '@/services/user.service';
import { IFullUser } from '@/types/user.interface';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useAuth } from './useAuth';

export const useProfile = () => {
  const {user} = useAuth()
  const router = useRouter()
  const { data } = useQuery(['get profile'], () => UserService.getProfile(), {
    select: ({ data }) => data,
    onError:(error) => {
      if(errorCatch(error) === 'Unauthorized'){
        router.push('/auth')
      }else{
        console.log(errorCatch(error))
      }
    },
    enabled: !!user
  });

  console.log(data);
  

  return { profile: data || ({} as IFullUser) };
};
