import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { fetchgetOrderByNumber, fetchOrderBurger } from './actionsOrder';

interface OrderState {
  order: TOrder | null;
  name: string;
  success: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  order: null,
  name: '',
  success: false,
  loading: false,
  error: null
};

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrderRequest: (state) => {
      state.success = !state.success;
    },
    clearOrderModalData: (state) => {
      state.order = null;
    }
  },
  selectors: {
    getOrder: (state) => state.order,
    getName: (state) => state.name,
    getOrderLoading: (state) => state.loading,
    getOrderSuccess: (state) => state.success,
    getOrderError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderBurger.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderBurger.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message ?? 'Unknown error';
      })
      .addCase(fetchOrderBurger.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.order;
        state.name = action.payload.name;
      })
      .addCase(fetchgetOrderByNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.orders[0];
      });
  }
});

export const {
  getOrder,
  getName,
  getOrderLoading,
  getOrderError,
  getOrderSuccess
} = orderSlice.selectors;

export const { setOrderRequest, clearOrderModalData } = orderSlice.actions;

export default orderSlice.reducer;
