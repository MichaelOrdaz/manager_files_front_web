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
    it('Add folder tags', function () {
        cy.intercept('POST','**/api/v1/documents/**').as('addTags')
        cy.get('[data-cy="filter-docs-input"]').type(randomCharacters)
        cy.get('[data-cy="document-item-row"]').click()
        cy.get('[data-cy="open-edit-tags-modal"]').click()
        cy.get('[data-cy="tags-input"]').type(`${randomCharacters}, ${randomCharacters},`)
        cy.contains('Aceptar').click()
        cy.wait('@addTags').then((response) => {
            expect(response.response.statusCode).to.equal(200)
        })
    })
    it('Edit folder name', function () {
        cy.intercept('POST','**/api/v1/documents/**').as('editFolderName')
        cy.get('[data-cy="edit-name"]').click()
        cy.get('[data-cy="new-name-input"]').type(randomCharacters + randomCharacters)
        cy.contains('Aceptar').click({force: true})
        cy.wait('@editFolderName').then((response) => {
            expect(response.response.statusCode).to.equal(200)
        })
    })

    it('Delete folder', function () {
        cy.intercept('DELETE','**/api/v1/documents/**').as('deleteFolder')
        cy.get('[data-cy="filter-docs-input"]').type(randomCharacters)
        cy.get('[data-cy="document-item-row"]').click()
        cy.contains('Eliminar carpeta').click()
        cy.contains('Aceptar').click()
        cy.wait('@deleteFolder').then( response => {
            expect(response.response.statusCode).to.equal(200)
            cy.get('#q-notify').should('exist')
            cy.get('[data-cy="filter-docs-input"] input').clear()
        })
    })

})
