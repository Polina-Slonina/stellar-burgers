import { createSlice } from '@reduxjs/toolkit';

import { TOrder } from '@utils-types';
import { fetchFeedsUser } from './actionFeedsUser';

interface FeedsUserState {
  feeds: TOrder[];
  loading: boolean;
  error: null | string;
}

export const initialState: FeedsUserState = {
  feeds: [],
  loading: false,
  error: null
};

export const feedsUserSlice = createSlice({
  name: 'feedsUser',
  initialState,
  reducers: {},
  selectors: {
    getFeedsUser: (state) => state.feeds,
    getFeedsUserLoading: (state) => state.loading,
    getFeedsUserError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedsUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeedsUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message ?? 'Unknown error';
      })
      .addCase(fetchFeedsUser.fulfilled, (state, action) => {
        state.loading = false;
        state.feeds = action.payload;
      });
  }
});

export const { getFeedsUser, getFeedsUserLoading, getFeedsUserError } =
  feedsUserSlice.selectors;
export default feedsUserSlice.reducer;
