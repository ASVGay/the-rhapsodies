describe('Home Page', () => {
    context('Auth redirect situations', () => {
        it('should redirect to sign in if logged out', () => {
            cy.logout()
            cy.visit('/')
            cy.location('pathname').should('equal', '/signin')
        })

        it('should stay on the home page if logged in', () => {
            cy.login('TEST_UID')
            cy.visit('/')
            cy.location('pathname').should('equal', '/')
        })
    })
})