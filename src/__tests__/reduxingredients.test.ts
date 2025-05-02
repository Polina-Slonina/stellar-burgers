import {
  ingredientSlice,
  initialState
} from '../services/slices/ingredients/ingredientSlice';
import { fetchIngredients } from '../services/slices/ingredients/actionsIngredients';

// Мнимые ингредиенты для тестов
const mockIngredients = [
  {
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
  },
  {
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
  }
];

// Mock-экшены
// const pendingAction = { type: 'ingredients/fetchIngredients/pending' };
// const fulfilledAction = {
//   type: 'ingredients/fetchIngredients/fulfilled',
//   payload: mockIngredients
// };
// const rejectedAction = {
//   type: 'ingredients/fetchIngredients/rejected',
//   error: { message: 'Unknown error' }
// };
const pendingAction = fetchIngredients.pending('', undefined);
const fulfilledAction = fetchIngredients.fulfilled(mockIngredients, '');
const rejectedAction = fetchIngredients.rejected(
  new Error('Unknown error'),
  ''
);

describe('ingredientSlice', () => {
  it('initializes correctly', () => {
    const state = ingredientSlice.reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  it('handles PENDING action', () => {
    const resultState = ingredientSlice.reducer(initialState, pendingAction);

    expect(resultState.loading).toBe(true);
    expect(resultState.error).toBeNull();
  });

  it('handles FULFILLED action', () => {
    const resultState = ingredientSlice.reducer(initialState, fulfilledAction);

    expect(resultState.loading).toBe(false);
    expect(resultState.ingredients).toStrictEqual(mockIngredients);
  });

  it('handles REJECTED action', () => {
    const resultState = ingredientSlice.reducer(initialState, rejectedAction);

    expect(resultState.loading).toBe(false);
    expect(resultState.error).toBe(
      rejectedAction.error?.message ?? 'Unknown error'
    );
  });
});
