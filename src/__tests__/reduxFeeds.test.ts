import { fetchFeeds } from '../services/slices/feeds/actionFeeds';
import { feedsSlice, initialState } from '../services/slices/feeds/feedsSlice';

// Fake-данные для тестов
const mockOrdersData = {
  success: true,
  orders: [
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
  ],
  total: 100,
  totalToday: 10
};

// Actions для тестирования
const pendingAction = fetchFeeds.pending('', undefined);
const fulfilledAction = fetchFeeds.fulfilled(mockOrdersData, '');
const rejectedAction = fetchFeeds.rejected(new Error('Unknown error'), '');

describe('feedsSlice', () => {
  it('initializes correctly', () => {
    const state = feedsSlice.reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  it('handles PENDING action', () => {
    const resultState = feedsSlice.reducer(initialState, pendingAction);

    expect(resultState.loading).toBe(true);
    expect(resultState.error).toBeNull();
  });

  it('handles FULFILLED action', () => {
    const resultState = feedsSlice.reducer(initialState, fulfilledAction);

    expect(resultState.loading).toBe(false);
    expect(resultState.feeds).toStrictEqual(mockOrdersData.orders);
    expect(resultState.total).toBe(mockOrdersData.total);
    expect(resultState.totalToday).toBe(mockOrdersData.totalToday);
  });

  it('handles REJECTED action', () => {
    const resultState = feedsSlice.reducer(initialState, rejectedAction);

    expect(resultState.loading).toBe(false);
    expect(resultState.error).toEqual(
      rejectedAction.error?.message || 'Unknown error'
    );
  });
});
