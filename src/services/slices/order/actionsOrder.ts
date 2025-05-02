import { getOrderByNumberApi, orderBurgerApi } from '../../../utils/burger-api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCookie } from '../../../utils/cookie';

export const fetchOrderBurger = createAsyncThunk(
  'orderBurger/fetchOrderBurger',
  async (data: string[]) => {
    getCookie('accessToken');
    getCookie('refreshToken');
    const res = await orderBurgerApi(data);
    return res;
  }
);

export const fetchgetOrderByNumber = createAsyncThunk(
  'orderByNumber/fetchgetOrderByNumber',
  async (number: number) => {
    const res = await getOrderByNumberApi(number);
    getCookie('accessToken');
    getCookie('refreshToken');
    return res;
  }
);
