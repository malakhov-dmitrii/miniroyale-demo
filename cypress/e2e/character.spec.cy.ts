describe('Home page tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/character/1');
  });

  it('renders character page', () => {
    cy.contains('Luke Skywalker');
  });

  it('allow to edit any cell in the table - it updates data everywhere', () => {
    const newName = 'Chad Groundlayer';
    cy.contains('name').next().click().clear().type(newName).blur();

    // check if the name is updated on the character page
    cy.get('table').contains(newName);
    cy.get('h1').contains(newName);

    cy.contains('Back').click();

    // check if the name is updated on the home page
    cy.url().should('eq', 'http://localhost:5173/');
    cy.contains(newName);

    // filter by name
    cy.get('input[id="search"]').type(newName).should('have.value', newName);
    cy.contains(newName);

    // NOTE: try this with eye color - this is quite nice
  });
});
