import { FC, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { getIngredients } from '../../services/slices/ingredients/ingredientSlice';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  const { id } = useParams<'id'>();
  const ingredients = useSelector(getIngredients); // Получаем все ингредиенты из стора
  const ingredientData = ingredients.find((item) => item._id === id); // Поиск ингредиента по id

  /** TODO: взять переменную из стора ????????!*/

  // const ingredientData = null;
  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
