import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { getFeedsUser } from '../../services/slices/feedsUser/feedsUserSlice';
import { fetchFeedsUser } from '../../services/slices/feedsUser/actionFeedsUser';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFeedsUser());
  }, [dispatch]);

  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(getFeedsUser);

  return <ProfileOrdersUI orders={orders} />;
};
