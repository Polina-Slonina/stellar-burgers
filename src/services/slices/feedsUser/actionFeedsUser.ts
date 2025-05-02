import { getFeedsApi, getOrdersApi } from '../../../utils/burger-api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCookie } from '../../../utils/cookie';

export const fetchFeedsUser = createAsyncThunk(
  'feedsUser/fetchFeedsUser',
  async () => await getOrdersApi()
);
