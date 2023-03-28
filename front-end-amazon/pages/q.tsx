import { ProductService } from '@/services/product/product.service';
import { useQuery } from '@tanstack/react-query';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

import Catalog from '@ui/Catalog';
import Layout from '@ui/layout/Layout';
import Meta from '@ui/Meta';

const SearchPage: NextPage = () => {
  const { query } = useRouter();

  const { data } = useQuery(['search product', query.term], () =>
    ProductService.getAll({
      searchTerm: query.term as string,
    }),
  );

  return (
    <Meta title='Search'>
      <Layout>
        <Catalog
          data={{ products: data?.products || [], length: data?.length || 0 }}
          title='Search by query'
        />
      </Layout>
    </Meta>
  );
};

export default SearchPage;
