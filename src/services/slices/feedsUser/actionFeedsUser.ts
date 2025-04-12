import { getFeedsApi, getOrdersApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCookie } from '../../../utils/cookie';

export const fetchFeedsUser = createAsyncThunk(
  'feedsUser/fetchFeedsUser',
  async () => {
    try {
      const res = await getOrdersApi();
      // getCookie('accessToken');
      // getCookie('refreshToken');
      return res;
    } catch (error) {
      throw error;
    }
  }
);
