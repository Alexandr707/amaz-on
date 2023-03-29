import { ProductService } from '@/services/product/product.service';
import { TypePaginationProducts } from '@/types/product.interface';
import Home from '@screens/home/Home';
import { GetStaticProps, NextPage } from 'next';

const HomePage: NextPage<TypePaginationProducts> = ({ products, length }) => {
  return <Home products={products} length={length} />;
};

export default HomePage;

export const getStaticProps: GetStaticProps<
  TypePaginationProducts
> = async () => {
  const data = await ProductService.getAll({
    page: 1,
    perPage:8,
  });

  return {
    props: data,
  };
};
