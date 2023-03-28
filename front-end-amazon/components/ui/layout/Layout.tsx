import { FC, PropsWithChildren } from 'react';

import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';

const Layout: FC<PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <div>
      <Header />
      <div className='grid grid-cols-layout'>
        <Sidebar />
        <main className='p-12'>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
