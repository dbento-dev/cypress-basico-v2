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

    cy.contains('button', 'Enviar').click()

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

    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um e-mail com o formato inválida', function () {
    cy.get('input[id="firstName"]').type('John')
    cy.get('input[id="lastName"]').type('Doe')
    cy.get('input[id="email"]').type('john.doe@example')
    cy.get('textarea[id="open-text-area"]').type('Lorem ipsum dolor sit amet.')

    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('verifica se ao digitar um valor não numérico no campo de telefone o campo de telefone permanece vazio', function () {
    cy.get('input[id="firstName"]').type('John')
    cy.get('input[id="lastName"]').type('Doe')
    cy.get('input[id="email"]').type('john-doe@example.com')
    cy.get('input[id="phone"]').type('abc').should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
    cy.get('#firstName').type('John')
    cy.get('#lastName').type('Doe')
    cy.get('#email').type('john-doe@example.com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('Lorem ipsum dolor sit amet.')

    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
    cy.get('#firstName')
      .type('John')
      .should('have.value', 'John')
      .clear()
      .should('have.value', '')
    cy.get('#lastName')
      .type('Doe')
      .should('have.value', 'Doe')
      .clear()
      .should('have.value', '')
    cy.get('#email')
      .type('john-doe@example.com')
      .should('have.value', 'john-doe@example.com')
      .clear()
      .should('have.value', '')
    cy.get('#phone')
      .type('123456789')
      .should('have.value', '123456789')
      .clear()
      .should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })

  it('envia o formulário com sucesso usando um comando customizado', function () {
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')
  })

  it('seleciona um produto (YouTube) por seu texto', function () {
    // Seleção pelo texto YouTube
    cy.get('#product').select('YouTube')
    // Seleção pelo value youtube
    // cy.get('#product').select('youtube')
    // Seleção pelo índice 1
    // cy.get('#product').select(1)

    // Seleção pelo índice (lista se for múltipla escolha)
    // cy.get('#product').select([1,2,3])

    cy.get('#product').should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', function () {
    cy.get('#product').select('Mentoria')
    cy.get('#product').should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', function () {
    cy.get('#product').select(1).should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', function () {
    cy.get('input[type="radio"][value="feedback"]')
      .check('feedback')
      .should('have.value', 'feedback')
  })

  it.only('marca cada tipo de atendimento', function () {
    cy.get('input[type="radio"') //seleciona o grupo de elementos
      .should('have.length', 3) // verifica a quantidade de elementos
      .each((element) => {
        // faz uma iteração entre cada elemento
        cy.wrap(element).check() // empacota o elemento da vez e "checka"
        cy.wrap(element).should('be.checked') // verifica se está com "check"
      })
  })
})
