import { NextPageAuth } from '@/providers/auth-provider/auth-page.types';
import { OrderService } from '@/services/order.service';
import { useQuery } from '@tanstack/react-query';

import Heading from '@ui/Heading';
import Layout from '@ui/layout/Layout';
import Meta from '@ui/Meta';

const MyOrdersPage: NextPageAuth = () => {
  const { data: orders } = useQuery(
    ['My orders'],
    () => OrderService.getAll(),
    { select: ({ data }) => data },
  );

  return (
    <Meta title='My orders'>
      <Layout>
        <Heading>My orders</Heading>
        <section>
          {orders && orders.length ? (
            orders.map(order => (
              <div
                key={order.id}
                className='rounded-lg bg-white shadow flex gap-10 p-7 my-7'
              >
                <span>#{order.id}</span>
                <span>{order.status}</span>
                <span>{new Date(order.createdAt).toLocaleDateString('ru-Ru')}</span>
                <span>{order.total}</span>
              </div>
            ))
          ) : (
            <div>Order list is emty</div>
          )}
        </section>
      </Layout>
    </Meta>
  );
};

export default MyOrdersPage;
