describe('', () => {
    const randomCharacters = `UsuarioPrueba${(Math.random() + 1).toString(36).substring(7)}`
    const roles = ['Administrador', 'Analista', 'Jefe de Departamento']
    const userData= {email: 'administrador@puller.mx', password: '12345678'}
    const selectedRol = roles[Math.floor((Math.random() * roles.length))]
    it('Log In', function () {
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
    it('Create User', function (){
        cy.intercept('**/users').as('createUser')
        cy.contains('Crear usuario').click()
        cy.get('[data-cy="rolIdSelector"]').click()
        cy.get('[data-cy="rolIdSelector"] .item').contains(selectedRol).first().click({force: true})
        if (selectedRol === 'Administrador') {
            cy.get('[data-cy="departmentIdSelector"]').click()
            cy.get('.item').last().click({force: true})
        }
        cy.get('[data-cy="userNameInput"]').type(randomCharacters)
        cy.get('[data-cy="userLatNameInput"]').type(randomCharacters)
        cy.get('[data-cy="userSecondLastNameInput"]').type(randomCharacters)
        cy.get('[data-cy="userEmailInput"]').type(`${randomCharacters}@puller.mx`)
        cy.get('[data-cy="userPhoneInput"]').type('12345678')
        cy.get('[data-cy="userPhoneInput"]').type('12345678')
        cy.get('[data-cy="userPasswordInput"]').type('12345678')
        cy.get('[data-cy="userPasswordInputRe"]').type('12345678')
        cy.contains('Aceptar').click()
        cy.wait('@createUser').then(response => {
            expect(response.response.statusCode).to.equal(201)
        })
    })
    it('Edit User', function (){
        cy.intercept('**/api/v1/users/**').as('editUser')
        cy.get('[data-cy="rol-filter"]').click()
        cy.get('[data-cy="rol-filter"] .item').contains(selectedRol).first().click({force: true})
        cy.get('[data-cy="text-filter"]').type(randomCharacters)
        cy.get("[data-cy='edit-user-icon']").click()
        cy.get('[data-cy="userNameInput"]').type(`edit`)
        cy.get('[data-cy="userLatNameInput"]').type(`edit`)
        cy.get('[data-cy="userSecondLastNameInput"]').type(`edit`)
        cy.get('[data-cy="userEmailInput"]').type(`edit`)
        cy.get('[data-cy="userPhoneInput"]').type('edit')
        cy.contains('Aceptar').click()
        cy.wait('@editUser').then(response => {
            expect(response.response.statusCode).to.equal(200)
        })
    })
    it('Edit password', function () {
        cy.intercept('POST','**/reset-password').as('updatePassword')
        cy.get('[data-cy="update-password-icon"]').click({force: true})
        cy.get('[data-cy="new-password"]').type('12345678')
        cy.get('[data-cy="password-confirmation"]').type('12345678')
        cy.contains('Aceptar').click()
        cy.wait('@updatePassword').then(response => {
            expect(response.response.statusCode).to.equal(200)
        })
    })
    it('Delete User', function () {
        cy.intercept('**/api/v1/users/**').as('deleteUser')
        cy.get('[data-cy="rol-filter"]').click()
        cy.get('[data-cy="rol-filter"] .item').contains(selectedRol).first().click({force: true})
        cy.get('[data-cy="delete-user-icon"]').first().click()
        cy.get('[data-cy="accept-modal-btn"]').click({force: true})
        cy.wait('@deleteUser').then(response => {
            expect(response.response.statusCode).to.equal(200)
        })
    })
})
