import { nanoid } from '@reduxjs/toolkit';
import {
  addIngredient,
  burgerConstructorSlice,
  clearIngredients,
  initialState,
  moveIngredientDown,
  moveIngredientUp,
  removeIngredient,
  setBun
} from '../services/slices/burger/burgerConstructorSlice';
import { describe, expect, it } from '@jest/globals';

const mockIngredientA = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
};

const mockIngredientToBun = {
  _id: '643d69a5c3f7b9001cfa093d',
  name: 'Флюоресцентная булка R2-D3',
  type: 'bun',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/bun-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
};

const mockIngredientB = {
  _id: '643d69a5c3f7b9001cfa0941',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
};

const mockIngredientC = {
  _id: '643d69a5c3f7b9001cfa093e',
  name: 'Филе Люминесцентного тетраодонтимформа',
  type: 'main',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/meat-03.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
};

describe('Burger Constructor Slice', () => {
  it('returns the initial state', () => {
    const state = burgerConstructorSlice.reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  describe('Bun Actions', () => {
    it('checking the addition of bread rolls', () => {
      const nextState = burgerConstructorSlice.reducer(
        initialState,
        setBun(mockIngredientA)
      );
      expect(nextState.bun).not.toBe(null);
    });
  });

  describe('Add Ingredient Action', () => {
    it('adds an ingredient successfully', () => {
      const nextState = burgerConstructorSlice.reducer(
        initialState,
        addIngredient(mockIngredientB)
      );

      expect(nextState.ingredients.length).toBe(1);
      expect(nextState.ingredients[0].name).toBe(
        'Биокотлета из марсианской Магнолии'
      );
    });

    it('adds bun', () => {
      const nextState = burgerConstructorSlice.reducer(
        initialState,
        addIngredient(mockIngredientA)
      );
      expect(nextState.bun).toEqual(mockIngredientA);
      expect(nextState.ingredients).toEqual([]);
    });

    it('does not add duplicate buns but allows other ingredients', () => {
      // Сначала добавляем булочку
      const stateWithFirstBun = burgerConstructorSlice.reducer(
        initialState,
        addIngredient(mockIngredientA)
      );

      // Проверяем, что булка добавилась
      expect(stateWithFirstBun.bun).toEqual(mockIngredientA);
      expect(stateWithFirstBun.ingredients).toEqual([]);

      const stateWithSecondBun = burgerConstructorSlice.reducer(
        stateWithFirstBun,
        addIngredient(mockIngredientToBun)
      );

      // Проверяем, что новая булка заменила старую
      expect(stateWithSecondBun.bun).toEqual(mockIngredientToBun);
      expect(stateWithSecondBun.ingredients).toEqual([]);

      // Добавляем обычный ингредиент (не булку)
      const stateWithIngredient = burgerConstructorSlice.reducer(
        stateWithSecondBun,
        addIngredient(mockIngredientB)
      );

      // Проверяем, что обычный ингредиент добавился в массив ingredients
      expect(stateWithIngredient.bun).toEqual(mockIngredientToBun);
      expect(stateWithIngredient.ingredients.length).toBe(1);
      expect(stateWithIngredient.ingredients[0].name).toBe(
        mockIngredientB.name
      );
    });
  });

  describe('Remove Ingredient Action', () => {
    it('removes an ingredient by index', () => {
      // Генерируем уникальный id прямо в тесте
      const newIngredientB = {
        ...mockIngredientB,
        id: nanoid() // Здесь генерируется уникальный id
      }; // Добавляем сюда id, созданный динамически

      // Генерируем уникальный id прямо в тесте
      const newIngredientC = {
        ...mockIngredientC,
        id: nanoid() // Здесь генерируется уникальный id
      }; // Добавляем сюда id, созданный динамически

      const stateWithIngredients = {
        bun: null,
        ingredients: [newIngredientB, newIngredientC]
      };
      const nextState = burgerConstructorSlice.reducer(
        stateWithIngredients,
        removeIngredient(1)
      ); // Удаляем первый ингредиент
      expect(nextState.ingredients.length).toBe(1);
      expect(nextState.ingredients[0].name).toBe(
        'Биокотлета из марсианской Магнолии'
      );
    });
  });

  describe('Move Ingredient Action', () => {
    // Генерируем уникальный id прямо в тесте
    const newIngredientB = {
      ...mockIngredientB,
      id: nanoid() // Здесь генерируется уникальный id
    }; // Добавляем сюда id, созданный динамически

    // Генерируем уникальный id прямо в тесте
    const newIngredientC = {
      ...mockIngredientC,
      id: nanoid() // Здесь генерируется уникальный id
    }; // Добавляем сюда id, созданный динамически

    it('moves an ingredient up in the list', () => {
      const stateWithIngredients = {
        bun: mockIngredientA,
        ingredients: [newIngredientB, newIngredientC]
      };
      const nextState = burgerConstructorSlice.reducer(
        stateWithIngredients,
        moveIngredientUp(1)
      ); // Перемещаем второй ингредиент вверх
      expect(nextState.ingredients[0].name).toBe(
        'Филе Люминесцентного тетраодонтимформа'
      );
      expect(nextState.ingredients[1].name).toBe(
        'Биокотлета из марсианской Магнолии'
      );
    });

    it('moves an ingredient down in the list', () => {
      const stateWithIngredients = {
        bun: mockIngredientA,
        ingredients: [newIngredientB, newIngredientC]
      };
      const nextState = burgerConstructorSlice.reducer(
        stateWithIngredients,
        moveIngredientDown(0)
      ); // Перемещаем первый ингредиент вниз
      expect(nextState.ingredients[0].name).toBe(
        'Филе Люминесцентного тетраодонтимформа'
      );
      expect(nextState.ingredients[1].name).toBe(
        'Биокотлета из марсианской Магнолии'
      );
    });
  });

  describe('Clear Ingredients Action', () => {
    it('clears all ingredients and bun', () => {
      const newIngredientB = {
        ...mockIngredientB,
        id: nanoid()
      };
      const stateWithItems = {
        bun: mockIngredientA,
        ingredients: [newIngredientB]
      };
      const nextState = burgerConstructorSlice.reducer(
        stateWithItems,
        clearIngredients()
      );
      expect(nextState.bun).toBeNull();
      expect(nextState.ingredients).toEqual([]);
    });
  });
});
