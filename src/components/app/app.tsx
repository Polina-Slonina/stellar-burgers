import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import {
  AppHeader,
  InfoModal,
  IngredientDetails,
  OrderInfo
} from '@components';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { FC, useEffect } from 'react';
import {
  OnlyAuth,
  OnlyUnAuth
} from '../../components/protected-route/protectedRoute';
import { fetchIngredients } from '../../services/slices/ingredients/actionsIngredients';
import { checkUserAuth } from '../../services/slices/user/actionsUser';

const App: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const backgroundLocation = location.state?.background;

  useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(fetchIngredients()); // Вызываем асинхронную санкцию для получения треков
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='*' element={<NotFound404 />} />
        <Route path='/' element={<ConstructorPage />} />
        <Route
          path='/ingredients/:id'
          element={
            <InfoModal>
              <IngredientDetails />
            </InfoModal>
          }
        />
        <Route
          path='/feed/:number'
          element={
            <InfoModal>
              <OrderInfo />
            </InfoModal>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <OnlyAuth
              children={
                <InfoModal>
                  <OrderInfo />
                </InfoModal>
              }
            />
          }
        />
        <Route path='/feed' element={<Feed />} />
        <Route path='/login' element={<OnlyUnAuth children={<Login />} />} />
        <Route
          path='/register'
          element={<OnlyUnAuth children={<Register />} />}
        />
        <Route
          path='/forgot-password'
          element={<OnlyUnAuth children={<ForgotPassword />} />}
        />
        <Route
          path='/reset-password'
          element={<OnlyUnAuth children={<ResetPassword />} />}
        />
        <Route path='/profile' element={<OnlyAuth children={<Profile />} />} />
        <Route
          path='/profile/orders'
          element={<OnlyAuth children={<ProfileOrders />} />}
        />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <InfoModal>
                <IngredientDetails />
              </InfoModal>
            }
          />
          <Route
            path='/feed/:number'
            element={
              <InfoModal>
                <OrderInfo />
              </InfoModal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <InfoModal>
                <OnlyAuth children={<OrderInfo />} />
              </InfoModal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
