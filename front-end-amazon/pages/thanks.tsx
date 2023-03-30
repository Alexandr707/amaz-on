import { NextPage } from 'next';

import Heading from '@ui/Heading';
import Layout from '@ui/layout/Layout';
import Meta from '@ui/Meta';

const ThanksPage: NextPage = () => {
  return (
    <Meta title='Search'>
      <Layout>
        <Heading>Thanks!</Heading>
      </Layout>
    </Meta>
  );
};

export default ThanksPage;
