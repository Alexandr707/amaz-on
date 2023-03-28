import { IProduct } from '@/types/product.interface';
import { convertPrice } from '@/utils/convertPrice';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import AddToCartButton from './AddToCartButton';
import ProductRating from './ProductRating';

const DynamicFavoriteButton = dynamic(() => import('./FavoriteButton'), {
  ssr: false,
});

const ProductItem: FC<{ product: IProduct }> = ({ product }) => {
  return (
    <div className='mb-2 animate-scaleIn'>
      <div className='bg-white rounded-xl relative overflow-hidden'>

        <div className='absolute flex flex-col-reverse top-2 right-3 z-10'>
        <DynamicFavoriteButton productId={product.id} />
        <AddToCartButton product={product} />
        </div>
        <Link href={`/product/${product.slug}`}>
          <Image
            width={250}
            height={250}
            src={product.images[0]}
            alt={product.name}
          />
        </Link>
      </div>
      <Link href={`/product/${product.slug}`}>
        <h3 className='mb-0.5 mt-2 font-semibold'>{product.name}</h3>
      </Link>
      <Link
        href={`/category/${product.category.slug}`}
        className='text-aqua text-xs mb-2'
      >
        {product.category.name}
      </Link>
      <ProductRating product={product} />
      <div className='text-xl font-semibold'>{convertPrice(product.price)}</div>
    </div>
  );
};

export default ProductItem;
