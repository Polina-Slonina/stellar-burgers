import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { useLocation } from 'react-router-dom';
import {
  clearUserErrors,
  getError
} from '../../services/slices/user/userSlice';
import { fetchRegisterUser } from '../../services/slices/user/actionsUser';

export const Register: FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
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
      fetchRegisterUser({
        email: email,
        name: userName,
        password: password
      })
    );
  };

  return (
    <RegisterUI
      errorText={userError as string}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
