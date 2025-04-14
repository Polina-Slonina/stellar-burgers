import { Action, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  fetchLogout,
  fetchRegisterUser,
  fetchUpdateUser,
  fetchUser,
  setUser
} from './actionsUser';

interface UserState {
  isAuthChecked: boolean;
  user: TUser | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  isAuthChecked: false,
  user: null,
  loading: false,
  error: null
};

interface RejectedAction extends Action {
  loading: boolean;
  error: Error;
}

// Функция предикат для проверки совпадений с запросами к API
const isPendingAction = (action: Action): action is RejectedAction =>
  action.type.endsWith('/pending');

const isRejectedAction = (action: Action): action is RejectedAction =>
  action.type.endsWith('/rejected');

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authCheck: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
    clearUserErrors: (state) => {
      state.error = null; // Очистка ошибки
    }
  },
  selectors: {
    getUser: (state) => state.user,
    getIsAuthChecked: (state) => state.isAuthChecked,
    getUserLoading: (state) => state.loading,
    getError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(fetchRegisterUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(fetchUpdateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(fetchLogout.fulfilled, (state) => {
        state.user = null;
        state.error = null;
        state.loading = false;
      })
      .addCase(setUser, (state, action) => {
        state.user = action.payload;
      })
      .addMatcher(isPendingAction, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(isRejectedAction, (state, action) => {
        state.loading = false;
        state.error = action.error?.message ?? 'Unknown error';
      });
  }
});

export const { getUser, getUserLoading, getError, getIsAuthChecked } =
  userSlice.selectors;

export const { authCheck, clearUserErrors } = userSlice.actions;
export default userSlice.reducer;

type ActionCreators = typeof userSlice.actions;

export type TInternalActions = ReturnType<ActionCreators[keyof ActionCreators]>;
