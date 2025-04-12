import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { fetchLoginUser } from '../../services/slices/user/actionsUser';
import {
  clearUserErrors,
  getError
} from '../../services/slices/user/userSlice';

export const Login: FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userError = useSelector(getError); // Получаем ошибку из слайса

  // Очищаем ошибки при изменении маршрута
  useEffect(() => {
    dispatch(clearUserErrors()); // Добавляем очистку ошибок
  }, [dispatch]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      fetchLoginUser({
        email: email,
        password: password
      })
    );
  };

  return (
    <LoginUI
      errorText={userError as string}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
