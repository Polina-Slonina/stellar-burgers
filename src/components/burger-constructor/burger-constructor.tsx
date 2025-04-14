import { FC, useEffect, useMemo, useState } from 'react';
import { TConstructorIngredient, TOrder } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch, RootState } from '../../services/store';
import {
  clearIngredients,
  getConstructorItems
} from '../../services/slices/burger/burgerConstructorSlice';
import { fetchOrderBurger } from '../../services/slices/order/actionsOrder';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../services/slices/user/userSlice';
import {
  clearOrderModalData,
  getOrder,
  getOrderSuccess,
  setOrderRequest
} from '../../services/slices/order/orderSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  /** TODO: взять переменные constructorItems ok!, orderRequest ??? и orderModalData из стора */
  const constructorItems = useSelector(getConstructorItems);
  const user = useSelector(getUser);

  const orderRequest = useSelector(getOrderSuccess);

  const orderModalData = useSelector(getOrder);

  // Обработчик нажатия клавиш
  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && orderRequest) {
        dispatch(setOrderRequest());
        dispatch(clearOrderModalData());
        dispatch(clearIngredients());
        // Закрываем модальное окно при нажатии Esc
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    // Удаляем обработчик при размонтаже компонента
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [orderRequest]);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) return navigate('/login');
    dispatch(
      fetchOrderBurger([
        constructorItems.bun?._id ?? '',
        ...constructorItems.ingredients.map((item) => item._id),
        constructorItems.bun?._id ?? ''
      ])
    ).unwrap();

    dispatch(setOrderRequest());
  };

  const closeOrderModal = () => {
    dispatch(clearOrderModalData());
    dispatch(setOrderRequest());
    dispatch(clearIngredients());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  // return null;

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
