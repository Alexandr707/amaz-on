import Image from 'next/image';
import Link from 'next/link';
import { FC, PropsWithChildren } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';

const Header: FC<PropsWithChildren<unknown>> = () => {
  return (
    <div className='bg-secondary w-full py-6 px-6 grid grid-cols-header'>
      <Link href={'/'}>
        <Image
          priority
          width={180}
          height={37}
          src='/amazon-logo.png'
          alt='Amazon'
        />
      </Link>
      <Search />
      <div className='items-center justify-end gap-10'>
        <Link href='/favorites' className='text-white'>
          <AiOutlineHeart size={28} />
        </Link>
        <HeartCart />
        <Headerprofile />
      </div>
    </div>
  );
};

export default Header;
