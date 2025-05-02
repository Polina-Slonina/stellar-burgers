import { rootReducer } from '../services/store'; // импортируем rootReducer
import { configureStore } from '@reduxjs/toolkit';

describe('rootReducer', () => {
  it('should initialize the state correctly', () => {
    // Создаем пустой начальный стейт
    const initialState = {};

    // Применяем действие типа "@INIT"
    const action = { type: '@INIT' };

    // Получаем финальный стейт после обработки действий
    const finalState = rootReducer(initialState, action);

    // Проверка структуры полученного стейта
    expect(finalState).toHaveProperty('ingredients');
    expect(finalState).toHaveProperty('feeds');
    expect(finalState).toHaveProperty('user');
    expect(finalState).toHaveProperty('burgerConstructor');
    expect(finalState).toHaveProperty('orders');
    expect(finalState).toHaveProperty('feedsUser');
  });

  it('should create a valid store with correct reducers', () => {
    // Создание магазина (store)
    const store = configureStore({ reducer: rootReducer });

    // Пустой начальный стейт
    const expectedInitialState = {
      burgerConstructor: { bun: null, ingredients: [] }, // Реальная структура
      feeds: {
        error: null,
        feeds: [],
        loading: false,
        total: 0,
        totalToday: 0
      },
      feedsUser: { error: null, feeds: [], loading: false },
      ingredients: { error: null, ingredients: [], loading: false },
      orders: {
        error: null,
        loading: false,
        name: '',
        order: null,
        orderRequest: false
      },
      user: { error: null, isAuthChecked: false, loading: false, user: null }
    };

    // Проверка начального состояния
    expect(store.getState()).toEqual(expectedInitialState);
  });
});
