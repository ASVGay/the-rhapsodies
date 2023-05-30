

describe("Sign-out", () => {
    beforeEach(() => {
        cy.logout()
        cy.visit("/sign-in")
    })

    it("Should navigate to home page when signing out", () => {
        cy.data(emailTextField).type(oldUserEmail)
        cy.data(passwordTextField).type(oldUserPassword)
        cy.data(signInSubmitBtn).click()
        cy.location("pathname").should("equal", "/")
    })

    it("Should show toastr when signing out returns error", () => {
        cy.intercept('POST', '/auth/v1/logout', { fixture: "signout-error.json"}).as('mockedRequest');
    })
})
