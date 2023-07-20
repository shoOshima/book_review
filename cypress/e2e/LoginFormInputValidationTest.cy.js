describe('root', () => {
  it('root', () => {
    cy.visit('/')
  })
})

describe('Mail_Vali', () => {
  it('onValidation', () => {
    cy.visit('/')
    cy.get('[data-testid="Form-input-mail"]').type('testmail')
    cy.get('[data-testid="Form-submit"]').click()
    cy.get('[data-testid="Form-input-mail-valierror"]').should('be.visible')
    expect(loc.pathname).to.eq('/')
  })

  it('pass', () => {
    cy.visit('/')
    cy.get('[data-testid="Form-input-mail"]').type('test@mail')
    cy.get('[data-testid="Form-submit"]').click()
    cy.get('[data-testid="Form-input-mail-valierror"]').should('not.exist')
  })
})
