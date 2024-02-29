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

  // passando um objeto de configuração para o type.
  it('preenche os campos obrigatórios e envia o formulário', function () {
    cy.get('input[id="firstName"]').type('John')
    cy.get('input[id="lastName"]').type('Doe')
    cy.get('input[id="email"]').type('john-doe@example.com', { delay: 100 })
    cy.get('textarea[id="open-text-area"]').type(
      'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. ',
      { delay: 0 },
    )
    // opção para selecionar o elemento
    // cy.get('#firstName').type('Doe')

    cy.get('button[type="submit"]').click()

    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um e-mail com o formato inválida', function () {
    cy.get('input[id="firstName"]').type('John')
    cy.get('input[id="lastName"]').type('Doe')
    cy.get('input[id="email"]').type('john.doe@example')
    cy.get('textarea[id="open-text-area"]').type('Lorem ipsum dolor sit amet.')

    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })

  it.only('verifica se ao digitar um valor não numérico no campo de telefone o campo de telefone permanece vazio', function () {
    cy.get('input[id="firstName"]').type('John')
    cy.get('input[id="lastName"]').type('Doe')
    cy.get('input[id="email"]').type('john-doe@example.com')
    cy.get('input[id="phone"]').type('abc').should('have.value', '')
  })
})
