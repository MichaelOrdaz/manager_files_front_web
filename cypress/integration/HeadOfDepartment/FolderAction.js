describe('Folder actions', () => {
    const randomCharacters = `CarpetaPrueba${(Math.random() + 1).toString(36).substring(7)}`
    const userData= {email: 'jefe1@puller.mx', password: '12345678'}
    it('Log In', () => {
        cy.visit('')
        cy.intercept('**/login').as('login')
        cy.intercept('**/account').as('accountData')
        cy.get('[data-cy="login-email-input"]').type(userData.email)
        cy.get('[data-cy="login-password-input"]').type(userData.password)
        cy.get('[data-cy="login-btn"]').click()
        cy.wait('@login').then(response => {
            expect(response.response.statusCode).to.equal(200)
        })
        cy.wait('@accountData').then(response => {
            expect(response.response.statusCode).to.equal(200)
        })
    })

    it('Create folder', function () {
        cy.intercept('**/api/v1/folders').as('createFolder')
        cy.contains('Nueva carpeta').click()
        cy.get('[data-cy="new-folder-name"]').type(randomCharacters)
        cy.contains('Aceptar').click({force: true})
        cy.wait('@createFolder').then((response) => {
            expect(response.response.statusCode).to.equal(201)
            cy.get('#q-notify').should('exist')
        })
    })
})
