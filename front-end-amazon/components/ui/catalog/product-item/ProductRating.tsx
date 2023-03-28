import { IProductDetaile } from '@/types/product.interface';
import { FC, useState } from 'react';
import { Rating } from 'react-simple-star-rating';

const ProductRating: FC<IProductDetaile> = ({ product }) => {
  const [rating, setRating] = useState(
    Math.round(
      product.reviews.reduce((acc, review) => review.rating + acc, 0) /
        product.reviews.length,
    ) || 0,
  );

  if (!rating) return null;

  return (
    <div className='mb-2'>
      {!!product.reviews.length && (
        <span className='mr-1'>
          <Rating
            readonly
            initialValue={rating}
            SVGstyle={{ display: 'inline-block' }}
            size={20}
            allowFraction
            transition
          />
          <span className='text-sm ml-1 mt-2' style={{ color: '#ffbc0d' }}>{rating}</span>
        </span>
      )}
      <span className='text-xs'>({product.reviews.length}&nbsp;rating)</span>
    </div>
  );
};

export default ProductRating;
