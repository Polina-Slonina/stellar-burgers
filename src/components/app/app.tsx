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
  Modal,
  OrderInfo
} from '@components';
import {
  Route,
  Routes,
  useLocation,
  useMatch,
  useNavigate
} from 'react-router-dom';
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
  const navigate = useNavigate();
  const backgroundLocation = location.state?.background;
  const profileMatch = useMatch('/profile/orders/:number')?.params.number;
  const feedMatch = useMatch('/feed/:number')?.params.number;
  const orderNumber = profileMatch || feedMatch;

  useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(fetchIngredients()); // Вызываем асинхронную санкцию для получения треков
  }, [dispatch]);

  const onClose = () => {
    navigate(-1); // Возврат к предыдущей странице
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='*' element={<NotFound404 />} />
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route
          path='/feed/:number'
          element={
            <div className={styles.detailPageWrap}>
              <p
                className={`text text_type_digits-default ${styles.detailHeader}`}
              >
                #{orderNumber && orderNumber.padStart(6, '0')}
              </p>
              <OrderInfo />
            </div>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <OnlyAuth
              children={
                <div className={styles.detailPageWrap}>
                  <p
                    className={`text text_type_digits-default ${styles.detailHeader}`}
                  >
                    #{orderNumber && orderNumber.padStart(6, '0')}
                  </p>
                  <OrderInfo />
                </div>
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
              <Modal title='Детали ингредиента' onClose={onClose}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/feed/:number'
            element={
              <Modal
                title={`#${orderNumber && orderNumber.padStart(6, '0')}`}
                onClose={onClose}
              >
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal
                title={`#${orderNumber && orderNumber.padStart(6, '0')}`}
                onClose={onClose}
              >
                <OnlyAuth children={<OrderInfo />} />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
