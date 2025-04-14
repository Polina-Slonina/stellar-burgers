import { getIngredientsApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => await getIngredientsApi()
);
