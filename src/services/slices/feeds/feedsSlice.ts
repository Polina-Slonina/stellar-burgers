import { createSlice } from '@reduxjs/toolkit';

import { TOrder } from '@utils-types';
import { fetchFeeds } from './actionFeeds';

interface FeedsState {
  feeds: TOrder[];
  total: number;
  totalToday: number;
  loading: boolean;
  error: null | string;
}

const initialState: FeedsState = {
  feeds: [],
  total: 0,
  totalToday: 0,
  loading: false,
  error: null
};

export const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    getFeeds: (state) => state,
    getFeedsLoading: (state) => state.loading,
    getFeedsError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message ?? 'Unknown error';
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.loading = false;
        state.feeds = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      });
  }
});

export const { getFeeds, getFeedsLoading, getFeedsError } =
  feedsSlice.selectors;
export default feedsSlice.reducer;
