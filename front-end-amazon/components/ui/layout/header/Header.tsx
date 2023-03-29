import Image from 'next/image';
import Link from 'next/link';
import { FC, PropsWithChildren } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import HeaderCart from './cart/HeaderCart';
import HeaderProfile from './headerProfile';
import Search from './Search';

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
      <div className='flex items-center justify-end gap-10'>
        <Link href='/favorites' className='text-white'>
          <AiOutlineHeart size={28} />
        </Link>
        <HeaderCart />
        <HeaderProfile />
      </div>
    </div>
  );
};

export default Header;
