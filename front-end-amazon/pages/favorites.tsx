import { useProfile } from '@/hooks/useProfile';
import { NextPageAuth } from '@/providers/auth-provider/auth-page.types';

import Favorites from '@ui/Favorites';
import Layout from '@ui/layout/Layout';
import Meta from '@ui/Meta';

const FavoritesPage: NextPageAuth = () => {
  const { profile } = useProfile();

  return (
    <Meta title='Favorites'>
      <Layout>
        <Favorites
          title='Favorites'
          data={{
            products: profile.favorites || [],
            length: profile.favorites?.length || 0,
          }}
        />
      </Layout>
    </Meta>
  );
};

FavoritesPage.isOnlyUser = true;

export default FavoritesPage;
