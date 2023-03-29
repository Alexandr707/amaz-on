import { ICartItem } from '@/types/cart.interface';
import { convertPrice } from '@/utils/convertPrice';
import Image from 'next/image';
import { FC } from 'react';

import CartActions from './cart-actions/CartActions';

const CartItem: FC<{ item: ICartItem }> = ({ item }) => {
  return (
    <div className='flex mb-4'>
      <Image
        src={item.product.images[0]}
        width={100}
        height={100}
        alt={item.product.name}
      />
      <div className='ml-2'>
        <div>{item.product.name}</div>
        <div className=''>{convertPrice(item.price * item.quantity)}</div>
        <CartActions item={item} />
      </div>
    </div>
  );
};

export default CartItem;
