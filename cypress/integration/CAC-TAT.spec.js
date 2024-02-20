// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
  beforeEach(() => {
    // root-level hook
    // runs before every test block
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', function () {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', function () {
    cy.get('input[id="firstName"]').type('John')
    cy.get('input[id="lastName"]').type('Doe')
    cy.get('input[id="email"]').type('john-doe@example.com')
    cy.get('textarea[id="open-text-area"]').type('Lorem ipsum dolor sit amet.')

    // opção para selecionar o elemento
    // cy.get('#firstName').type('Doe')

    cy.get('button[type="submit"]').click()

    cy.get('.success').should('be.visible')
  })
})
