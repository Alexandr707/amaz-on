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
        profile?.avatarURL ? (
          <Image
            width={43}
            height={43}
            src={profile.avatarURL}
            alt='Profile'
            className='rounded-full border animate-opacity'
          />
        ) : (
          <Image
            width={43}
            height={43}
            src='/avatar-placeholder.jpg'
            alt='Profile'
            className='rounded-full border animate-opacity'
          />
        )
      ) : (
        <Link
          href='/auth'
          className='flex justify-center items-center w-[43px] h-[43px] rounded-full bg-secondary text-white hover:opacity-70 transition-all duration-200'
        >
          <FiLogIn size={30} />
        </Link>
      )}
    </div>
  );
};

export default HeaderProfile;
