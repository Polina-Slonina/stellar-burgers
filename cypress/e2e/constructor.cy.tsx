/// <reference types="cypress" />
// import '../support/commands';
import type {} from '../support/cypress';

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
    cy.visit('http://localhost:4000/');

    // Ждем завершения критических запросов
    cy.wait(['@getIngredients']);
  });

  it('should display ingredients categories', () => {
    // Проверяем наличие всех категорий
    cy.get('[data-cy="ingredient-item"]').should('have.length', 3);

    // Проверяем наличие вкладок
    cy.contains('Булки').should('exist');
    cy.contains('Начинки').should('exist');
    cy.contains('Соусы').should('exist');
  });

  describe('adding an ingredient from the list to the constructor', () => {
    it('Adding a bun on a click', () => {
      // Находим карточку булки
      cy.get('[data-type="bun"]').first().contains('Добавить').click();

      // Проверяем добавление в конструктор
      cy.get('[data-cy="constructor-bun-top"]').should('exist');
      cy.get('[data-cy="constructor-bun-bottom"]').should('exist');
    });

    it('Adds the filling on a click', () => {
      // Сначала добавляем булку
      cy.get('[data-type="bun"]').first().contains('Добавить').click();

      // Добавляем начинку
      cy.get('[data-type="main"]').first().contains('Добавить').click();

      // Проверяем
      cy.get('[data-cy="constructor-ingredient"]').should('exist');
    });

    it('Adds sauce on click', () => {
      // Добавляем булку
      cy.get('[data-type="bun"]').first().contains('Добавить').click();

      // Добавляем начинку
      cy.get('[data-type="main"]').first().contains('Добавить').click();

      // Добавляем соус
      cy.get('[data-type="sauce"]').first().contains('Добавить').click();

      // Проверяем
      cy.get('[data-cy="constructor-ingredient"]').should('contain', 'Соус'); // Проверяем по тексту
    });
  });

  describe('Operation of modal windows', () => {
    it('Opening the ingredient modal window', () => {
      // Кликаем на первый ингредиент
      cy.get('[data-cy="ingredient-item"]').first().click();

      // Проверяем что модальное окно открылось
      cy.get('[data-cy="modal"]').should('exist');
      cy.get('[data-cy="modal-overlay"]').should('exist');

      // Проверяем наличие контента
      cy.get('[data-cy="modal-title"]').should('contain', 'Детали ингредиента');
    });

    it('Closing the modal window by clicking on the cross', () => {
      // Открываем модальное окно
      cy.get('[data-cy="ingredient-item"]').first().click();

      // Кликаем на кнопку закрытия
      cy.get('[data-cy="modal-close-button"]').click();

      // Проверяем что модальное окно закрылось
      cy.get('[data-cy="modal"]').should('not.exist');
      cy.get('[data-cy="modal-overlay"]').should('not.exist');
    });

    it('Closing the modal window by clicking on the overlay', () => {
      // Открываем модальное окно
      cy.get('[data-cy="ingredient-item"]').first().click();

      // Кликаем на оверлей
      cy.get('[data-cy="modal-overlay"]').click({ force: true });

      // Проверяем что модальное окно закрылось
      cy.get('[data-cy="modal"]').should('not.exist');
      cy.get('[data-cy="modal-overlay"]').should('not.exist');
    });

    it('Closing the modal window by pressing ESC', () => {
      cy.get('[data-cy="ingredient-item"]').first().click();

      // Нажимаем ESC
      cy.get('body').type('{esc}');

      cy.get('[data-cy="modal"]').should('not.exist');
    });
  });

  describe('Creating an order', () => {
    it('completing a full order processing cycle', () => {
      cy.userAuthorization();

      // Добавляем булку
      cy.get('[data-type="bun"]').first().contains('Добавить').click();

      // Добавляем начинку
      cy.get('[data-type="main"]').first().contains('Добавить').click();

      // Добавляем соус
      cy.get('[data-type="sauce"]').first().contains('Добавить').click();

      // Кликаем "Оформить заказ"
      cy.get('[data-cy="order-button"]').click();

      // Мокаем запрос на оформление заказа
      cy.intercept('POST', 'api/orders', { fixture: 'order.json' });

      // Проверяем модальное окно загрузки
      cy.get('[data-cy="order-loading-modal"]').should('exist');
      cy.get('[data-cy="order-loading-modal"]').should('not.exist');

      // Проверяем появление модалки с номером заказа
      cy.get('[data-cy="modal"]').should('exist');
      cy.get('[data-cy="order-numder"]').should('contain', 12345);

      // Закрываем модальное окно
      cy.get('[data-cy="modal-close-button"]').click();
      cy.get('[data-cy="modal"]').should('not.exist');

      // Проверяем что конструктор очистился
      cy.get('[data-cy="constructor-bun-top"]').should('not.exist');
      cy.get('[data-cy="constructor-bun-bottom"]').should('not.exist');
      cy.get('[data-cy="constructor-ingredient-element"]').should('not.exist');
    });
  });
});
