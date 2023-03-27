import { IProduct } from '@/types/product.interface';
import { FC } from 'react';

import ProductItem from './catalog/product-item/ProductItem';
import Loader from './Loader';

const Catalog: FC<{ products: IProduct[], isLoading?:boolean }> = ({ products,isLoading }) => {

if(isLoading) return <Loader />

  return (
    <section>
      {products ? products.map(product => (
        <ProductItem key={product.id} product={product} />
      ))
      :<div>There are no products</div>
    }
    </section>
  );
};

export default Catalog;
