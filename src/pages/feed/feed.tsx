import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getFeeds } from '../../services/slices/feeds/feedsSlice';
import { fetchFeeds } from '../../services/slices/feeds/actionFeeds';

export const Feed: FC = () => {
  const orderFeeds = useSelector(getFeeds);
  const dispatch = useDispatch();

  // Функция для обновления данных
  const handleGetFeeds = useCallback(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  useEffect(() => {
    handleGetFeeds(); // Изначально вызывается при монтировании компонента
  }, [handleGetFeeds]);

  /** TODO: взять переменную из стора ???*/
  const orders: TOrder[] = orderFeeds.feeds;

  if (!orders.length) {
    return <Preloader />;
  }
  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
