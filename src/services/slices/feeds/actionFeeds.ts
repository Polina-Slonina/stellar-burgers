import { getFeedsApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchFeeds = createAsyncThunk('feed/fetchFeeds', async () => {
  try {
    return await getFeedsApi();
  } catch (error) {
    throw error;
  }
});
