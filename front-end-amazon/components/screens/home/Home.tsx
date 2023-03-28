import { useActions } from '@/hooks/useActions';
import { TypePaginationProducts } from '@/types/product.interface';
import { FC } from 'react';

import Catalog from '@ui/Catalog';
import Layout from '@ui/layout/Layout';
import Meta from '@ui/Meta';

const Home: FC<TypePaginationProducts> = ({ products, length }) => {
  const { logout } = useActions();
  return (
    <Meta title='Home'>
      <Layout>
        <button
          className='hover:text-primary transition-all duration-300'
          onClick={() => logout()}
        >
          Logout
        </button>
        <Catalog data={{products, length}} title='Fresh produts' />
      </Layout>
    </Meta>
  );
};

export default Home;
