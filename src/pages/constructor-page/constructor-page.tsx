import styles from './constructor-page.module.css';

import { BurgerIngredients } from '../../components';
import { BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';
import { FC } from 'react';
import { getIngredientsLoading } from '../../services/slices/ingredients/ingredientSlice';
import { useSelector } from '../../services/store';
import { useLocation } from 'react-router-dom';

export const ConstructorPage: FC = () => {
  const location = useLocation();
  const isLoadingingredients = useSelector(getIngredientsLoading);
  /** TODO: взять переменную из стора !ок */
  const isIngredientsLoading = isLoadingingredients;

  return (
    <>
      {isIngredientsLoading ? (
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
