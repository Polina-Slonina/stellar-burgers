import {
  orderSlice,
  initialState,
  setOrderRequest,
  clearOrderModalData
} from '../services/slices/order/orderSlice';
import {
  fetchOrderBurger,
  fetchgetOrderByNumber
} from '../services/slices/order/actionsOrder';

// Fake-данные для тестов
const mockOrdersData = {
  success: false,
  name: 'Флюоресцентный люминесцентный метеоритный бургер',
  order: {
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
  }
};

const mockOrderByNumberData = {
  orders: [mockOrdersData.order],
  success: true
};

// Mock-экшены
// const pendingAction = fetchOrderBurger.pending('', undefined);
// const fulfilledOrderAction = fetchOrderBurger.fulfilled(mockOrdersData, '');
// const fulfilledOrderByNumberAction = fetchgetOrderByNumber.fulfilled(mockOrderByNumberData, '');
// const rejectedAction = fetchOrderBurger.rejected(new Error('Unknown error'), '');

const pendingAction = fetchOrderBurger.pending(
  'requestId',
  mockOrdersData.order.ingredients
);
const fulfilledOrderAction = fetchOrderBurger.fulfilled(
  mockOrdersData,
  'requestId',
  mockOrdersData.order.ingredients
);
const fulfilledOrderByNumberAction = fetchgetOrderByNumber.fulfilled(
  mockOrderByNumberData,
  'requestId',
  mockOrdersData.order.number
);
const rejectedAction = fetchOrderBurger.rejected(
  new Error('Unknown error'),
  'requestId',
  mockOrdersData.order.ingredients
);

describe('orderSlice', () => {
  it('initializes correctly', () => {
    const state = orderSlice.reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  describe('extraReducers', () => {
    it('handles PENDING action', () => {
      const resultState = orderSlice.reducer(initialState, pendingAction);

      expect(resultState.loading).toBe(true);
      expect(resultState.error).toBeNull();
    });

    it('handles FULFILLED action for fetchOrderBurger', () => {
      const resultState = orderSlice.reducer(
        initialState,
        fulfilledOrderAction
      );

      expect(resultState.loading).toBe(false);
      expect(resultState.order).toEqual(mockOrdersData.order);
      expect(resultState.name).toEqual(mockOrdersData.name);
    });

    it('handles FULFILLED action for fetchgetOrderByNumber', () => {
      const resultState = orderSlice.reducer(
        initialState,
        fulfilledOrderByNumberAction
      );

      expect(resultState.loading).toBe(false);
      expect(resultState.order).toEqual(mockOrderByNumberData.orders[0]);
    });

    it('handles REJECTED action', () => {
      const resultState = orderSlice.reducer(initialState, rejectedAction);

      expect(resultState.loading).toBe(false);
      expect(resultState.error).toBe(
        rejectedAction.error?.message ?? 'Unknown error'
      );
    });
  });

  describe('reducers', () => {
    it('toggle success with setOrderRequest', () => {
      // Исходное состояние с успехом: false
      const state1 = orderSlice.reducer(initialState, setOrderRequest());
      expect(state1.orderRequest).toBe(true);

      // Переключиться обратно на значение false
      const state2 = orderSlice.reducer(state1, setOrderRequest());
      expect(state2.orderRequest).toBe(false);
    });

    it('clear the order data using clearOrderModalData', () => {
      // State with order data
      const stateWithOrder = {
        ...initialState,
        order: mockOrdersData.order,
        name: mockOrdersData.name
      };

      // проверяем состояние после очистки
      const clearedState = orderSlice.reducer(
        stateWithOrder,
        clearOrderModalData()
      );

      expect(clearedState.order).toBeNull();
    });

    // ??????
    // it('should not affect other state fields when using reducers', () => {
    //   const stateWithData = {
    //     ...initialState,
    //     order: mockOrdersData.order,
    //     name: 'Test Order',
    //     success: true,
    //     loading: false,
    //     error: null
    //   };

    //   // Test setOrderRequest
    //   const stateAfterToggle = orderSlice.reducer(stateWithData, setOrderRequest());
    //   expect(stateAfterToggle.success).toBe(false);
    //   expect(stateAfterToggle.order).toEqual(mockOrdersData.order);
    //   expect(stateAfterToggle.name).toBe('Test Order');

    //   // Test clearOrderModalData
    //   const stateAfterClear = orderSlice.reducer(stateWithData, clearOrderModalData());
    //   expect(stateAfterClear.order).toBeNull();
    //   expect(stateAfterClear.name).toBe('Test Order');
    //   expect(stateAfterClear.success).toBe(true);
    // });
  });
});
