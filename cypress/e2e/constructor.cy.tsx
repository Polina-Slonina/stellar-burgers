/// <reference types="cypress" />
import type {} from '../support/cypress';

// Селекторы
const selectors = {
  INGREDIENT_ITEM: '[data-cy="ingredient-item"]',
  INGREDIENT_BUN: '[data-type="bun"]',
  INGREDIENT_MAIN: '[data-type="main"]',
  INGREDIENT_SAUCE: '[data-type="sauce"]',
  CONSTRUCTOR_BUN_TOP: '[data-cy="constructor-bun-top"]',
  CONSTRUCTOR_BUN_BOTTOM: '[data-cy="constructor-bun-bottom"]',
  CONSTRUCTOR_INGREDIENT: '[data-cy="constructor-ingredient"]',
  CONSTRUCTOR_INGREDIENT_ELEMENT: '[data-cy="constructor-ingredient-element"]',
  MODAL: '[data-cy="modal"]',
  MODAL_OVERLAY: '[data-cy="modal-overlay"]',
  MODAL_TITLE: '[data-cy="modal-title"]',
  MODAL_CLOSE: '[data-cy="modal-close-button"]',
  ORDER_BUTTON: '[data-cy="order-button"]',
  ORDER_LOADING_MODAL: '[data-cy="order-loading-modal"]',
  ORDER_NUMBER: '[data-cy="order-numder"]'
};

describe('Burger Constructor', () => {
  beforeEach(() => {
    // Мокаем запрос ингридиентов
    cy.fixture('ingredients.json').then((ingredients) => {
      cy.intercept('GET', '**/api/ingredients', {
        statusCode: 200,
        body: { success: true, data: ingredients }
      }).as('getIngredients');
    });

    // Посещаем страницу
    cy.visit('/');

    // Ждем завершения критических запросов
    cy.wait(['@getIngredients']);
  });

  it('should display ingredients categories', () => {
    // Проверяем наличие всех категорий
    cy.get(selectors.INGREDIENT_ITEM).should('have.length', 3);

    // Проверяем наличие вкладок
    cy.contains('Булки').should('exist');
    cy.contains('Начинки').should('exist');
    cy.contains('Соусы').should('exist');
  });

  describe('adding an ingredient from the list to the constructor', () => {
    it('Adding a bun on a click', () => {
      // Находим карточку булки
      cy.get(selectors.INGREDIENT_BUN).first().contains('Добавить').click();

      // Проверяем добавление в конструктор
      cy.get(selectors.CONSTRUCTOR_BUN_TOP).should('exist');
      cy.get(selectors.CONSTRUCTOR_BUN_BOTTOM).should('exist');
    });

    it('Adds the filling on a click', () => {
      // Сначала добавляем булку
      cy.get(selectors.INGREDIENT_BUN).first().contains('Добавить').click();

      // Добавляем начинку
      cy.get(selectors.INGREDIENT_MAIN).first().contains('Добавить').click();

      // Проверяем
      cy.get(selectors.CONSTRUCTOR_INGREDIENT).should('exist');
    });

    it('Adds sauce on click', () => {
      // Добавляем булку
      cy.get(selectors.INGREDIENT_BUN).first().contains('Добавить').click();

      // Добавляем начинку
      cy.get(selectors.INGREDIENT_MAIN).first().contains('Добавить').click();

      // Добавляем соус
      cy.get(selectors.INGREDIENT_SAUCE).first().contains('Добавить').click();

      // Проверяем
      cy.get(selectors.CONSTRUCTOR_INGREDIENT).should('contain', 'Соус'); // Проверяем по тексту
    });
  });

  describe('Operation of modal windows', () => {
    beforeEach(() => {
      // Находим элемент один раз перед тестами
      cy.get(selectors.INGREDIENT_ITEM).first().click();
    });

    it('Opening the ingredient modal window', () => {
      // Кликаем на первый ингредиент
      //cy.get('[data-cy="ingredient-item"]').first().click();

      // Проверяем что модальное окно открылось
      cy.get(selectors.MODAL).should('exist');
      cy.get(selectors.MODAL_OVERLAY).should('exist');

      // Проверяем наличие контента
      cy.get(selectors.MODAL_TITLE).should('contain', 'Детали ингредиента');
    });

    it('Closing the modal window by clicking on the cross', () => {
      // Открываем модальное окно
      //cy.get('[data-cy="ingredient-item"]').first().click();

      // Кликаем на кнопку закрытия
      cy.get(selectors.MODAL_CLOSE).click();

      // Проверяем что модальное окно закрылось
      cy.get(selectors.MODAL).should('not.exist');
      cy.get(selectors.MODAL_OVERLAY).should('not.exist');
    });

    it('Closing the modal window by clicking on the overlay', () => {
      // Открываем модальное окно
      //cy.get('[data-cy="ingredient-item"]').first().click();

      // Кликаем на оверлей
      cy.get(selectors.MODAL_OVERLAY).click({ force: true });

      // Проверяем что модальное окно закрылось
      cy.get(selectors.MODAL).should('not.exist');
      cy.get(selectors.MODAL_OVERLAY).should('not.exist');
    });

    it('Closing the modal window by pressing ESC', () => {
      //cy.get('[data-cy="ingredient-item"]').first().click();

      // Нажимаем ESC
      cy.get('body').type('{esc}');

      cy.get(selectors.MODAL).should('not.exist');
    });
  });

  describe('Creating an order', () => {
    it('completing a full order processing cycle', () => {
      cy.userAuthorization();

      // Добавляем булку
      cy.get(selectors.INGREDIENT_BUN).first().contains('Добавить').click();

      // Добавляем начинку
      cy.get(selectors.INGREDIENT_MAIN).first().contains('Добавить').click();

      // Добавляем соус
      cy.get(selectors.INGREDIENT_SAUCE).first().contains('Добавить').click();

      // Кликаем "Оформить заказ"
      cy.get(selectors.ORDER_BUTTON).click();

      // Мокаем запрос на оформление заказа
      cy.intercept('POST', 'api/orders', { fixture: 'order.json' });

      // Проверяем модальное окно загрузки
      cy.get(selectors.ORDER_LOADING_MODAL).should('exist');
      cy.get(selectors.ORDER_LOADING_MODAL).should('not.exist');

      // Проверяем появление модалки с номером заказа
      cy.get(selectors.MODAL).should('exist');
      cy.get(selectors.ORDER_NUMBER).should('contain', 12345);

      // Закрываем модальное окно
      cy.get(selectors.MODAL_CLOSE).click();
      cy.get(selectors.MODAL).should('not.exist');

      // Проверяем что конструктор очистился
      cy.get(selectors.CONSTRUCTOR_BUN_TOP).should('not.exist');
      cy.get(selectors.CONSTRUCTOR_BUN_BOTTOM).should('not.exist');
      cy.get(selectors.CONSTRUCTOR_INGREDIENT_ELEMENT).should('not.exist');
    });
  });
});
