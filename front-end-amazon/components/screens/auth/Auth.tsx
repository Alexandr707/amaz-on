import { FC, PropsWithChildren } from 'react';

import Heading from '@ui/Heading';
import Meta from '@ui/Meta';
import Button from '@ui/button/Button';

const Auth: FC<PropsWithChildren<unknown>> = () => {
  return (
    <Meta title='Auth'>
      <Heading>Auth</Heading>
      <Button variant='orange'>auth</Button>
      <Button variant='white'>auth</Button>
    </Meta>
  );
};

export default Auth;
