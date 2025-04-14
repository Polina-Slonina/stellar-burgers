import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { deleteCookie, getCookie, setCookie } from '../../../utils/cookie';
import { authCheck } from './userSlice';
import { TUser } from '@utils-types';

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const res = await getUserApi();
  getCookie('accessToken');
  localStorage.getItem('refreshToken');
  return res;
});

export const fetchLoginUser = createAsyncThunk(
  'user/fetchUser',
  async (data: TLoginData) => {
    const res = await loginUserApi(data);
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res;
  }
);

export const fetchRegisterUser = createAsyncThunk(
  'user/fetchRegisterUser',
  async (data: TRegisterData) => {
    const res = await registerUserApi(data);
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res;
  }
);

export const fetchUpdateUser = createAsyncThunk(
  'user/fetchUpdateUser',
  updateUserApi
);

export const fetchLogout = createAsyncThunk('user/fetchLogout', async () => {
  const res = await logoutApi();
  deleteCookie('accessToken');
  localStorage.clear();
  return res;
});

export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  async (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      await getUserApi()
        .then((data) => dispatch(setUser(data.user)))
        .finally(() => dispatch(authCheck(true)));
    } else {
      dispatch(authCheck(true));
    }
  }
);

export const setUser = createAction<TUser | null, 'user/setUser'>(
  'user/setUser'
);

export type TExternalActions = ReturnType<typeof setUser>;
