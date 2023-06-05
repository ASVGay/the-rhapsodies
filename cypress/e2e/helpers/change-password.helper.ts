export const testErrorHandlingChangePassword = (submitPasswordBtn, confirmPasswordTextfield, passwordTextfield, shortPassword ) => {
    it("should all give error messages when nothing is filled in", () => {
        cy.data(submitPasswordBtn).click()
        cy.data(`${confirmPasswordTextfield}-error`).contains("Confirm Password is required")
        cy.data(`${passwordTextfield}-error`).contains("Password is required")
    })

    it("should give error when passwords are not the same", () => {
        cy.data(passwordTextfield).type("test12345")
        cy.data(confirmPasswordTextfield).type("test123456")
        cy.data(submitPasswordBtn).click()
        cy.data(`${confirmPasswordTextfield}-error`).contains("Passwords do not match")
    })

    it("should give error when new password is too short", () => {
        cy.data(passwordTextfield).type(shortPassword)
        cy.data(confirmPasswordTextfield).type(shortPassword)
        cy.data(submitPasswordBtn).click()
        cy.data(`${passwordTextfield}-error`).contains("Password should at least be 6 characters.")
    })
}