describe('Folder actions', () => {
    const randomCharacters = `CarpetaPrueba${(Math.random() + 1).toString(36).substring(7)}`
    const randomFileCharacters = `ArchivoPrueba${(Math.random() + 1).toString(36).substring(7)}`
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

    it('Create File', function () {
        cy.intercept('POST','**/api/v1/documents').as('createFile')
        cy.contains('Subir archivo').click({force: true})
        cy.get('[data-cy="file-loader"]').attachFile('../tests-assets/file.pdf')
        cy.get('[data-cy="file-name"]').type(randomFileCharacters)
        cy.get('[data-cy="file-desc"]').type(randomFileCharacters)
        cy.get('[data-cy="input-date"]').type('2022-02-02')
        cy.get('[data-cy="identifier-input"]').type(`${Math.floor(Math.random() * (9000 - 100 + 1) + 100)}`)
        cy.get('[data-cy="load-file-btn"]').click({force: true})
        cy.wait('@createFile').then((response) => {
            expect(response.response.statusCode).to.equal(201)
            cy.get('#q-notify').should('exist')
        })
    })

    it('Delete File', function () {
        cy.intercept('DELETE','**/api/v1/documents/**').as('deleteFile')
        cy.get('[data-cy="filter-docs-input"]').type(randomFileCharacters)
        cy.get('[data-cy="document-item-row"]').click()
        cy.contains('Eliminar archivo').click()
        cy.contains('Aceptar').click()
        cy.wait('@deleteFile').then( response => {
            expect(response.response.statusCode).to.equal(200)
            cy.get('#q-notify').should('exist')
            cy.get('[data-cy="filter-docs-input"] input').clear()
        })
    })
})
