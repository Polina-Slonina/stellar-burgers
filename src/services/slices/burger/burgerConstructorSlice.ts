import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

// Типы состояния
interface BurgerConstructorState {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
}

export const initialState: BurgerConstructorState = {
  bun: null,
  ingredients: []
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    setBun(state, action: PayloadAction<TIngredient>) {
      state.bun = action.payload;
    },
    addIngredient(state, action: PayloadAction<TIngredient>) {
      // Преобразование ингредиента в TConstructorIngredient с добавлением id
      const newIngredient: TConstructorIngredient = {
        ...action.payload,
        id: nanoid() // Здесь генерируется уникальный id
      };
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else {
        state.ingredients.push(newIngredient);
      }
    },
    moveIngredientUp(state, action: PayloadAction<number>) {
      const { payload: oldIndex } = action;
      const newIndex = oldIndex - 1;

      // Копируем массив ингредиентов
      const ingredients = [...state.ingredients];

      // Меняем местами элементы
      [ingredients[newIndex], ingredients[oldIndex]] = [
        ingredients[oldIndex],
        ingredients[newIndex]
      ];

      // Обновляем состояние
      state.ingredients = ingredients;
    },
    moveIngredientDown(state, action: PayloadAction<number>) {
      const { payload: oldIndex } = action;
      const newIndex = oldIndex + 1;

      // Копируем массив ингредиентов
      const ingredients = [...state.ingredients];

      // Меняем местами элементы
      [ingredients[newIndex], ingredients[oldIndex]] = [
        ingredients[oldIndex],
        ingredients[newIndex]
      ];

      // Обновляем состояние
      state.ingredients = ingredients;
    },
    removeIngredient(state, action: PayloadAction<number>) {
      state.ingredients.splice(action.payload, 1);
    },
    clearIngredients(state) {
      state.ingredients = [];
      state.bun = null;
    }
  },
  selectors: {
    getIngredients: (state) => state.ingredients,
    // Селектор для получения всех элементов конструктора
    getConstructorItems: (state) => state
  }
});

export const { getIngredients, getConstructorItems } =
  burgerConstructorSlice.selectors;

// Экспорт действий
export const {
  setBun,
  addIngredient,
  removeIngredient,
  clearIngredients,
  moveIngredientUp,
  moveIngredientDown
} = burgerConstructorSlice.actions;

// Экспорт редьюсера
export default burgerConstructorSlice.reducer;
