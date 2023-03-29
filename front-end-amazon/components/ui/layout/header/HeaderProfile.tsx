import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { FiLogIn } from 'react-icons/fi';

const HeaderProfile: FC = () => {
  const { profile } = useProfile();
  const{user}= useAuth()

  if (!profile) return null;

  return (
    <div className='shrink-0'>
      {user ? (
        profile?.avatarUrl ? (
          <Image
            width={43}
            height={43}
            src={profile.avatarUrl}
            alt='Profile'
            className='rounded-full border border-primary border-solid animate-opacity'
          />
        ) : (
          <Image
            width={43}
            height={43}
            src='/avatar-placeholder.jpg'
            alt='Profile'
            className='rounded-full border border-primary border-solid animate-opacity'
          />
        )
      ) : (
        <Link
          href='/auth'
          className='flex justify-center items-center w-[43px] h-[43px] rounded-full bg-white border-primary border-solid border-2 text hover:opacity-90 transition-all duration-200'
        >
          <FiLogIn size={30} />
        </Link>
      )}
    </div>
  );
};

export default HeaderProfile;
