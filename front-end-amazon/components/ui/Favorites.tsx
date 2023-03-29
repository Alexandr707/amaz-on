import { TypePaginationProducts } from '@/types/product.interface';
import { FC, useState } from 'react';

import Button from './button/Button';
import ProductItem from './catalog/product-item/ProductItem';
import Heading from './Heading';

interface IFavorites {
  data: TypePaginationProducts;
  title?: string;
}

const Favorites: FC<IFavorites> = ({ data, title }) => {
  const [page, setPage] = useState<number>(1);

  return (
    <section>
      {!!title && <Heading className='mb-5'>{title}</Heading>}
      {!!data?.products.length ? (
        <>
          <div className='grid grid-cols-4 gap-10 '>
            {data.products.map(product => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
          <div className='text-center mt-10'>
            {Array.from({ length: data.length / 4 }).map((_, idx) => (
              <Button
                key={idx}
                variant={page === idx + 1 ? 'orange' : 'white'}
                size='sm'
                onClick={() => setPage(idx + 1)}
              >
                {idx + 1}
              </Button>
            ))}
          </div>
        </>
      ) : (
        <div>There are no products</div>
      )}
    </section>
  );
};

export default Favorites;
