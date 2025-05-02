import {
  combineReducers,
  combineSlices,
  configureStore
} from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import ingredientReducer, {
  ingredientSlice
} from './slices/ingredients/ingredientSlice';
import feedsReducer, { feedsSlice } from './slices/feeds/feedsSlice';
import userReducer, { userSlice } from './slices/user/userSlice';
import burgerconstructorReducer, {
  burgerConstructorSlice
} from './slices/burger/burgerConstructorSlice';
import orderReducer, { orderSlice } from './slices/order/orderSlice';
import { feedsUserSlice } from './slices/feedsUser/feedsUserSlice';

// Заменить на импорт настоящего редьюсера

export const rootReducer = combineSlices(
  ingredientSlice,
  feedsSlice,
  userSlice,
  burgerConstructorSlice,
  orderSlice,
  feedsUserSlice
);

const store = configureStore({
  reducer: rootReducer,
  // middleware: [thunkMiddleware],
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
