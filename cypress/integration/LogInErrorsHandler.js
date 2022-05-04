describe('Login errore handler', () => {
    before(() => { cy.visit('') })
    it('Wrong email handler',() => {
        cy.intercept('**/login').as('login')
        cy.get('[data-cy="login-email-input"]').type('error-email@puller.mx')
        cy.get('[data-cy="login-password-input"]').type('12345678')
        cy.get('[data-cy="login-btn"]').click()
        cy.wait('@login').then(response => {
            expect(response.response.statusCode).to.equal(404)
            cy.get('#q-notify').should('exist')
            cy.contains('Registro no encontrado').should('exist')
        })
    })
    it('Wrong password handler ',() => {
        cy.intercept('**/login').as('login')
        cy.get('[data-cy="login-email-input"]').type('administrador@puller.mx')
        cy.get('[data-cy="login-password-input"]').type('error')
        cy.get('[data-cy="login-btn"]').click()
        cy.wait('@login').then(response => {
            expect(response.response.statusCode).to.equal(422)
            cy.get('#q-notify').should('exist')
            cy.contains('Credenciales invalidas').should('exist')
        })
    })
})
