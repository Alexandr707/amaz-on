import { useProfile } from '@/hooks/useProfile';
import { UserService } from '@/services/user.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FC } from 'react';
import { RiShoppingCartFill, RiShoppingCartLine } from 'react-icons/ri';

const FavoriteButton: FC<{ productId: number }> = ({ productId }) => {
  const { profile } = useProfile();

  const { invalidateQueries } = useQueryClient();

  const { mutate } = useMutation(
    ['toggle favorite'],
    () => UserService.toogleFavorites(productId),
    {
      onSuccess() {
        invalidateQueries(['get profile']);
      },
    },
  );

  const isExist = profile.favorites.some(favorite => favorite.id === productId);

  return (
    <div>
      <button onClick={() => mutate()}>
        {isExist ? <RiShoppingCartFill /> : <RiShoppingCartLine />}
      </button>
    </div>
  );
};

export default FavoriteButton;