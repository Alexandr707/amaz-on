import { ReviewService } from '@/services/review.service';
import { IProductDetaile } from '@/types/product.interface';
import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import { Rating } from 'react-simple-star-rating';

const ProductRating: FC<IProductDetaile> = ({ product }) => {
  const {data : rating} = useQuery(
    ['avarage-by-product', product.id],
    () => ReviewService.getAverageByProduct(product.id),
    { select: ({ data }) => data },
  );
  
  return <div>
    <Rating
    readonly
    initialValue={rating}
    SVGstyle={{display:'inline-block'}}
    size={34}
    allowFraction
    transition
    />
    <span>({product.reviews.length}rating)</span>
  </div>;
};

export default ProductRating;
