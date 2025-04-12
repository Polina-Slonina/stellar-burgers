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
  try {
    const res = await getUserApi();
    getCookie('accessToken');
    localStorage.getItem('refreshToken');
    return res;
  } catch (error) {
    throw error;
  }
});

export const fetchLoginUser = createAsyncThunk(
  'user/fetchUser',
  async (data: TLoginData) => {
    try {
      const res = await loginUserApi(data);
      setCookie('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      return res;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchRegisterUser = createAsyncThunk(
  'user/fetchRegisterUser',
  async (data: TRegisterData) => {
    try {
      const res = await registerUserApi(data);
      setCookie('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      return res;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchUpdateUser = createAsyncThunk(
  'user/fetchUpdateUser',
  async (data: TRegisterData) => {
    try {
      const res = await updateUserApi(data);
      return res;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchLogout = createAsyncThunk('user/fetchLogout', async () => {
  try {
    const res = await logoutApi();
    deleteCookie('accessToken');
    localStorage.clear();
    return res;
  } catch (error) {
    throw error;
  }
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
