import { ProductService } from '@/services/product/product.service';
import { EnumProductSort } from '@/services/product/product.types';
import { TypePaginationProducts } from '@/types/product.interface';
import { useQuery } from '@tanstack/react-query';
import { FC, useState } from 'react';

import Button from './button/Button';
import ProductItem from './catalog/product-item/ProductItem';
import Heading from './Heading';
import Loader from './Loader';
import SortDropdown from './product-item/SortDropdown';

interface ICatalog {
  data: TypePaginationProducts;
  title?: string;
}

const Catalog: FC<ICatalog> = ({ data, title }) => {
  const [sortType, setSortType] = useState<EnumProductSort>(
    EnumProductSort.NEWEST,
  );
  const [page, setPage] = useState<number>(1);

  const { data: response, isLoading } = useQuery(
    ['product', sortType, page],
    () =>
      ProductService.getAll({
        page,
        perPage: 4,
        sort: sortType,
      }),
  );

  if (isLoading) return <Loader />;

  return (
    <section>
      {!!title && <Heading className='mb-5'>{title}</Heading>}
      {!!response?.products.length ? (
        <>
          <SortDropdown sortType={sortType} setSortType={setSortType} />
          <div className='grid grid-cols-4 gap-10 '>
            {response.products.map(product => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
          <div className='text-center mt-10'>
            {Array.from({ length: response.length / 4 }).map((_, idx) => (
              <Button
                key={idx}
                variant={page === idx + 1 ? 'orange' : 'white'}
                size='sm'
                onClick={() => setPage(idx + 1)}
                className='mx-2'
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

export default Catalog;
