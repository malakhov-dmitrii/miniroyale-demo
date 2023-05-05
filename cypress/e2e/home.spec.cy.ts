describe('Home page tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('renders home page', () => {
    cy.contains('Star Wars Characters');
  });

  it('opens the page and finds basic elements', () => {
    cy.contains('Star Wars Characters');
    cy.contains('Search');
    cy.contains('Next');
    cy.contains('Previous');
  });

  it('find Luke Skywalker on first page, navigate to next, he should not be present', () => {
    cy.contains('Luke Skywalker');
    cy.contains('Next').click();
    cy.contains('Luke Skywalker').should('not.exist');
  });

  it('searches for a character', () => {
    cy.get('input[id="search"]').type('Luke Skywalker').should('have.value', 'Luke Skywalker');
    cy.contains('Luke Skywalker');
  });

  it('search should get empty on pagination', () => {
    cy.get('input[id="search"]').type('Luke Skywalker').should('have.value', 'Luke Skywalker');
    cy.contains('Luke Skywalker');
    cy.contains('Next').click();
    cy.get('input[id="search"]').should('have.value', '');
  });

  it('open person page', () => {
    cy.contains('Luke Skywalker').click();
    cy.url().should('include', '/character');
  });

  it('previous page is disabled on first page', () => {
    cy.contains('Previous').should('be.disabled');
  });
});
