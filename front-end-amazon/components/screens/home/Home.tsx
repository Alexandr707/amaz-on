import { FC, PropsWithChildren } from 'react';

import Heading from '@ui/Heading';
import Meta from '@ui/Meta';

const Home: FC<PropsWithChildren<unknown>> = () => {
  return (
    <Meta title='Home'>
      <Heading>Hello world!</Heading>
    </Meta>
  );
};

export default Home;
