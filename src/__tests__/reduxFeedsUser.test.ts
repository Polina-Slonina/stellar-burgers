import {
  feedsUserSlice,
  initialState
} from '../services/slices/feedsUser/feedsUserSlice';
import { fetchFeedsUser } from '../services/slices/feedsUser/actionFeedsUser';

// Fake-данные для тестов
const mockOrdersData = {
  feeds: [
    {
      _id: '68126fa3e8e61d001cec54ac',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa0940',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный люминесцентный метеоритный бургер',
      createdAt: '2025-04-30T18:44:51.794Z',
      updatedAt: '2025-04-30T18:44:52.548Z',
      number: 75972
    },
    {
      _id: '68126e83e8e61d001cec54aa',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Краторный био-марсианский бургер',
      createdAt: '2025-04-30T18:40:03.060Z',
      updatedAt: '2025-04-30T18:40:03.723Z',
      number: 75971
    }
  ]
};

// Mock-экшены
const pendingAction = fetchFeedsUser.pending('', undefined);
const fulfilledAction = fetchFeedsUser.fulfilled(mockOrdersData.feeds, '');
const rejectedAction = fetchFeedsUser.rejected(new Error('Unknown error'), '');

describe('feedsUserSlice', () => {
  it('initializes correctly', () => {
    const state = feedsUserSlice.reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  it('handles PENDING action', () => {
    const resultState = feedsUserSlice.reducer(initialState, pendingAction);

    expect(resultState.loading).toBe(true);
    expect(resultState.error).toBeNull();
  });

  it('handles FULFILLED action', () => {
    const resultState = feedsUserSlice.reducer(initialState, fulfilledAction);

    expect(resultState.loading).toBe(false);
    expect(resultState.feeds).toStrictEqual(mockOrdersData.feeds);
  });

  it('handles REJECTED action', () => {
    const resultState = feedsUserSlice.reducer(initialState, rejectedAction);

    expect(resultState.loading).toBe(false);
    expect(resultState.error).toBe(
      rejectedAction.error?.message ?? 'Unknown error'
    );
  });
});
