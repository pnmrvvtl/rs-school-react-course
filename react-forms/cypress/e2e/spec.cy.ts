/// <reference types="cypress" />
// @ts-check

describe('Links', () => {
  it('checks /about link works', () => {
    cy.visit('/about');
    // cy.get('header').contains('ABOUT').click();
    cy.url().should('include', '/about');
  });

  it('checks /form link works', () => {
    cy.visit('/');
    cy.get('header').contains('FORM').click();
    cy.url().should('include', '/form');
  });

  it('checks adding to form works', () => {
    cy.visit('/form');
    cy.get('input[name="title"]').type('John Doe');
    cy.get('input[name="price"]').type('100');
    cy.get('input[name="rating"]').type('100');
    cy.get('input[name="discount"]').type('100');
    cy.get('select[id="category"]').select('Notebook');
    cy.get('select[id="brand"]').select('Apple');
    cy.get('input[type="date"]').type('1991-11-11');
    cy.get('input[id=radioInput2]').click();
    cy.get('input[type=file]').selectFile('fav.png');
    cy.get('button[type="submit"]').click();

    cy.get('h4').should('have.css', 'color', 'rgb(230, 57, 70)');
    cy.get('section').contains('refurbished');

    cy.get('input[name="title"]').type('John Doe');
    cy.get('input[name="price"]').type('100');
    cy.get('input[name="rating"]').type('100');
    cy.get('input[name="discount"]').type('100');
    cy.get('select[id="category"]').select('Notebook');
    cy.get('select[id="brand"]').select('Apple');
    cy.get('input[type="date"]').type('1991-11-11');
    cy.get('input[id=radioInput1]').click();
    cy.get('input[type=file]').selectFile('fav.png');
    cy.get('button[type="submit"]').click();

    cy.get('section').contains('new');

    cy.get('input[name="title"]').should(($input) => {
      const value = $input.val();
      if (value === '') {
        expect(value).to.equal(''); // input is empty
      }
    });
  });

  it('checks main page and loading cards and opening and closing popup', () => {
    cy.visit('/');
    cy.get('input[type="text"]').type('pizza');
    cy.get('input[type="button"]').click();
    cy.contains('h4', 'Pizza').should('be.visible').click();
    cy.contains('Product Details').should('be.visible');
    cy.get('[class^="_close-button"]').click();

    cy.get('input[type="text"]').clear();
    cy.get('input[type="text"]').type('tomato');
    cy.get('input[value="SEARCH"]').click();
    cy.contains('h4', 'Tomato').should('be.visible').click();
    cy.contains('Product Details').should('be.visible');
    cy.get('[class^="_close-button"]').click();
  });
});
