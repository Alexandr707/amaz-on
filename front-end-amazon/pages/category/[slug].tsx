import { CategoryService } from '@/services/category.service';
import { ProductService } from '@/services/product/product.service';
import { ICategory } from '@/types/category.interface';
import { IProduct } from '@/types/product.interface';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import Catalog from '@ui/Catalog';
import Layout from '@ui/layout/Layout';
import Meta from '@ui/Meta';

const CategoryPage: NextPage<{
  products: IProduct[];
  category: ICategory;
}> = ({ category, products }) => {
  return (
    <Meta title={category.name}>
      <Layout>
        <Catalog
          data={{ products, length: products.length }}
          title={category.name}
        />
      </Layout>
    </Meta>
  );
};

export default CategoryPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: categories } = await CategoryService.getAll();

  const paths = categories.map(category => ({
    params: { slug: category.slug },
  }));

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data: products } = await ProductService.getByCategory(
    params?.slug as string,
  );

  const { data: category } = await CategoryService.getSlug(
    params?.slug as string,
  );

  return {
    props: {
      products,
      category,
    },
  };
};
