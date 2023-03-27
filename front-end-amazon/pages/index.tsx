import { ProductService } from '@/services/product/product.service';
import { IProduct } from '@/types/product.interface';
import Home from '@screens/home/Home';
import { GetStaticProps, NextPage } from 'next';

const HomePage: NextPage = () => {
  return <Home />;
};

export default HomePage;

export const getStaticProps: GetStaticProps<{products: IProduct[]}> = async () => {
  const {data:products} = await ProductService.getAll({
    page:1,perPage:4
  })

  return {
    props:{
      products
    }
  }
}
