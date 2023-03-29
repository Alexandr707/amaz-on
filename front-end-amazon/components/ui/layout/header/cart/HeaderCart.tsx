import { useCart } from '@/hooks/useCart';
import { useOutside } from '@/hooks/useOutside';
import { convertPrice } from '@/utils/convertPrice';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { RiShoppingCartLine } from 'react-icons/ri';

import Button from '@ui/button/Button';
import SquareButton from '@ui/button/SquareButton';

import CartItem from './cart-item/CartItem';

const HeaderCart: FC = () => {
  const { isShow, setIsShow, ref } = useOutside(false);

  const { items, total } = useCart();

  const { push } = useRouter();

  return (
    <div ref={ref} className='relative'>
      <SquareButton
        Icon={RiShoppingCartLine}
        number={items.length}
        onClick={() => setIsShow(!isShow)}
      />
      {isShow && (
        <div className='absolute top-[4.2rem] w-80 -left-[13.8rem] bg-secondary rounded-xl px-5 py-3 text-sm text-white'>
          <div className='font-normal text-lg mb-5'>My cart</div>
          <div className='cart'>
            {items.length ? (
              items.map(item => <CartItem key={item.id} item={item} />)
            ) : (
              <div className='font-light'>Cart is empty!</div>
            )}
          </div>
          <div>
            <div className='flex gap-2 w-full'>
              <div>Total:</div>
              <div>{convertPrice(total)}</div>
            </div>
            <div className='text-center'>
              <Button variant='white' size='sm' className='mt-5 mb-2'>
                Place order
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderCart;
