import {
  userSlice,
  initialState,
  authCheck,
  clearUserErrors
} from '../services/slices/user/userSlice';
import { fetchUser } from '../services/slices/user/actionsUser';
import { TUser } from '@utils-types';

const mockUser: TUser = {
  name: 'Polina',
  email: 'test@mail.ru'
};

// Mock-экшены
const pendingAction = fetchUser.pending('', undefined);
const rejectedAction = fetchUser.rejected(new Error('Unknown error'), '');

describe('userSlice', () => {
  it('initializes correctly', () => {
    const state = userSlice.reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  describe('extraReducers', () => {
    it('handles PENDING action', () => {
      const resultState = userSlice.reducer(initialState, pendingAction);

      expect(resultState.loading).toBe(true);
      expect(resultState.error).toBeNull();
    });

    it('handles REJECTED action', () => {
      const resultState = userSlice.reducer(initialState, rejectedAction);

      expect(resultState.loading).toBe(false);
      expect(resultState.error).toBe(
        rejectedAction.error?.message ?? 'Unknown error'
      );
    });

    it('handle fetchUser.fulfilled', () => {
      const action = {
        type: 'user/fetchUser/fulfilled',
        payload: { user: mockUser }
      };
      const state = userSlice.reducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthChecked).toBe(true);
    });

    it('handle fetchRegisterUser.fulfilled', () => {
      const action = {
        type: 'user/fetchRegisterUser/fulfilled',
        payload: { user: mockUser }
      };
      const state = userSlice.reducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.user).toEqual(mockUser);
    });

    it('handle fetchUpdateUser.fulfilled', () => {
      const action = {
        type: 'user/fetchUpdateUser/fulfilled',
        payload: { user: mockUser }
      };
      const state = userSlice.reducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.user).toEqual(mockUser);
    });

    it('handle fetchLogout.fulfilled', () => {
      const stateWithUser = {
        ...initialState,
        user: mockUser,
        error: 'error'
      };
      const action = { type: 'user/fetchLogout/fulfilled' };
      const state = userSlice.reducer(stateWithUser, action);

      expect(state.user).toBeNull();
      expect(state.error).toBeNull();
      expect(state.loading).toBe(false);
    });

    it('handle setUser', () => {
      const action = {
        type: 'user/setUser',
        payload: mockUser
      };
      const state = userSlice.reducer(initialState, action);

      expect(state.user).toEqual(mockUser);
    });
  });

  describe('reducers', () => {
    it('handle authCheck', () => {
      const action = authCheck(true);
      const state = userSlice.reducer(initialState, action);

      expect(state.isAuthChecked).toBe(true);
    });

    it('handle clearUserErrors', () => {
      const stateWithError = {
        ...initialState,
        error: 'error'
      };
      const state = userSlice.reducer(stateWithError, clearUserErrors());

      expect(state.error).toBeNull();
    });
  });
});
