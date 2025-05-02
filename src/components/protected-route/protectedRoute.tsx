import { useSelector } from '../../services/store';
import { Preloader } from '@ui';
import { useLocation } from 'react-router';
import { Navigate } from 'react-router-dom';
import {
  getIsAuthChecked,
  getUser
} from '../../services/slices/user/userSlice';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: JSX.Element;
};

const Protected = ({ onlyUnAuth = false, children }: ProtectedRouteProps) => {
  const location = useLocation();
  const isAuthChecked = useSelector(getIsAuthChecked); // селектор получения состояния загрузки пользователя
  const user = useSelector(getUser); // селектор получения пользователя из store

  if (!isAuthChecked) {
    // пока идёт чекаут пользователя, показываем прелоадер
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    // если пользователь на странице авторизации и данные есть в хранилище
    return (
      <Navigate
        to={'/login'}
        state={{
          from: { location }
        }}
      />
    );
  }

  if (onlyUnAuth && user) {
    // если пользователь на странице авторизации и данных в хранилище нет, то делаем редирект
    const from = location.state?.from || { pathname: '/' };
    return <Navigate to={from} state={{ from: location }} />;
  }

  return children;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ children }: { children: JSX.Element }) => (
  <Protected onlyUnAuth children={children} />
);
