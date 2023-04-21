/// <reference types="cypress" />
// @ts-check

describe('Links', () => {
  it('checks About link works', () => {
    cy.visit('/');
    cy.get('header').contains('ABOUT').click();
    cy.url().should('include', '/about');
  });
});
