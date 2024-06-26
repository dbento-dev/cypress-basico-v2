// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
  const threeSecondsInMs = 3000

  beforeEach(() => {
    // root-level hook
    // runs before every test block
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', function () {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', function () {
    cy.clock()

    cy.get('input[id="firstName"]').type('John')
    cy.get('input[id="lastName"]').type('Doe')
    cy.get('input[id="email"]').type('john-doe@example.com')
    cy.get('textarea[id="open-text-area"]').type('Lorem ipsum dolor sit amet.')

    // opção para selecionar o elemento
    // cy.get('#firstName').type('Doe')

    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')

    cy.tick(threeSecondsInMs)

    cy.get('.success').should('not.be.visible')
  })

  // passando um objeto de configuração para o type.
  it('preenche os campos obrigatórios e envia o formulário', function () {
    cy.clock()

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

    cy.tick(threeSecondsInMs)

    cy.get('.success').should('not.be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um e-mail com o formato inválida', function () {
    cy.clock()

    cy.get('input[id="firstName"]').type('John')
    cy.get('input[id="lastName"]').type('Doe')
    cy.get('input[id="email"]').type('john.doe@example')
    cy.get('textarea[id="open-text-area"]').type('Lorem ipsum dolor sit amet.')

    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')

    cy.tick(threeSecondsInMs)

    cy.get('.error').should('not.be.visible')
  })

  it('verifica se ao digitar um valor não numérico no campo de telefone o campo de telefone permanece vazio', function () {
    cy.get('input[id="firstName"]').type('John')
    cy.get('input[id="lastName"]').type('Doe')
    cy.get('input[id="email"]').type('john-doe@example.com')
    cy.get('input[id="phone"]').type('abc').should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
    cy.clock()

    cy.get('#firstName').type('John')
    cy.get('#lastName').type('Doe')
    cy.get('#email').type('john-doe@example.com')
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type('Lorem ipsum dolor sit amet.')

    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')

    cy.tick(threeSecondsInMs)

    cy.get('.error').should('not.be.visible')
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
    cy.clock()

    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')

    cy.tick(threeSecondsInMs)

    cy.get('.error').should('not.be.visible')
  })

  it('envia o formulário com sucesso usando um comando customizado', function () {
    cy.clock()

    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')

    cy.tick(threeSecondsInMs)

    cy.get('.success').should('not.be.visible')
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

  it('marca cada tipo de atendimento', function () {
    cy.get('input[type="radio"') //seleciona o grupo de elementos
      .should('have.length', 3) // verifica a quantidade de elementos
      .each((element) => {
        // faz uma iteração entre cada elemento
        cy.wrap(element).check() // empacota o elemento da vez e "checka"
        cy.wrap(element).should('be.checked') // verifica se está com "check"
      })
  })

  it('marca ambos checkboxes, depois desmarca o último', function () {
    cy.get('input[type="checkbox"]')
      .check() //marca o elemento ou todos se for uma lista
      .should('be.checked') // verifica se ambos foram marcados.
      .last() // seleciona apenas o ultimo
      .uncheck() // desmarca o elemento
      .should('not.be.checked') // verifica se foi desmarcado
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
    cy.clock()

    cy.get('#firstName').type('John')
    cy.get('#lastName').type('Doe')
    cy.get('#email').type('john-doe@example.com')
    cy.get('input[type="checkbox"][value="phone"]').check()
    cy.get('#open-text-area').type('Lorem ipsum dolor sit amet.')

    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')

    cy.tick(threeSecondsInMs)

    cy.get('.error').should('not.be.visible')
  })

  it('seleciona um arquivo da pasta fixtures', function () {
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json')
      .should(function (input) {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo simulando um drag-and-drop', function () {
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
      .should(function (input) {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
    cy.fixture('example.json').as('sampleFile')

    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('@sampleFile')
      .should(function (input) {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function () {
    cy.get('#privacy a[href="privacy.html"]').should(
      'have.attr',
      'target',
      '_blank',
    )
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', function () {
    cy.get('#privacy a[href="privacy.html"]')
      .invoke('removeAttr', 'target') //remove o atributo target
      .click()

    cy.contains('CAC TAT - Política de privacidade').should('be.visible') // verifica se o texto está contido na pagina aberta após o click
  })

  it('exibe mensagem por 3 segundos sem esperar 3 segundos no relógio "normal"', function () {
    cy.clock() // congela o relógio do navegador

    cy.fillMandatoryFieldsAndSubmit() // ação que dispara algo que exibe uma mensagem por três segundos

    cy.get('.success').should('be.visible') // verificação de que a mensagem está visível

    cy.tick(threeSecondsInMs) // avança o relógio três segundos (em milissegundos). Avanço este tempo para não perdê-lo esperando.

    cy.get('.success').should('not.be.visible') // verificação de que a mensagem não está mais visível
  })

  it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')

    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
  })

  it('preenche a area de texto usando o comando invoke', () => {
    const longText = Cypress._.repeat('0123456789', 20)

    cy.get('#open-text-area')
      .invoke('val', longText)
      .should('have.value', longText)
  })

  it('faz uma requisição HTTP', () => {
    cy.request(
      'https://cac-tat.s3.eu-central-1.amazonaws.com/index.html',
    ).should((resp) => {
      const { status, statusText, body } = resp

      expect(status).to.equal(200)
      expect(statusText).to.equal('OK')
      expect(body).to.include('CAC TAT')
    })
  })

  it.only('encontra o gato escondido na aplicação', () => {
    cy.get('#cat').should('not.be.visible').invoke('show').should('be.visible')
  })
})
