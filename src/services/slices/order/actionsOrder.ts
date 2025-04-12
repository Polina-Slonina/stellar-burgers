import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCookie } from '../../../utils/cookie';

export const fetchOrderBurger = createAsyncThunk(
  'orderBurger/fetchOrderBurger',
  async (data: string[]) => {
    try {
      getCookie('accessToken');
      getCookie('refreshToken');
      const res = await orderBurgerApi(data);
      return res;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchgetOrderByNumber = createAsyncThunk(
  'orderByNumber/fetchgetOrderByNumber',
  async (number: number) => {
    try {
      const res = await getOrderByNumberApi(number);
      getCookie('accessToken');
      getCookie('refreshToken');
      return res;
    } catch (error) {
      throw error;
    }
  }
);
