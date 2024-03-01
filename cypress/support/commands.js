Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
  cy.get('#firstName').type('John')
  cy.get('#lastName').type('Doe')
  cy.get('#email').type('john-doe@example.com')
  cy.get('#phone').type('123456789')
  cy.get('#open-text-area').type('Lorem ipsum dolor sit amet.')
  cy.contains('button', 'Enviar').click()
})
