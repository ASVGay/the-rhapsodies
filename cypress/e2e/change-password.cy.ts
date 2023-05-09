const newPassword = Cypress.env("user_password")
const errorPopup = "error-popup-change-password"
const passwordTextfield = "change-password-textfield"
const confirmPasswordTextfield = "change-password-confirm-textfield"
const submitPasswordBtn = "submit-password-btn"
const shortPassword = "test"
describe("Change password", () => {
  beforeEach(() => {
    //this ensures the user is logged in when visiting the change password page
    cy.logout()
    cy.login()
    cy.visit("/change-password")
  })

  it("should logout when changing password", () => {
    cy.data(passwordTextfield).type(newPassword)
    cy.data(confirmPasswordTextfield).type(newPassword)
    cy.data(submitPasswordBtn).click()
    cy.location("pathname").should("equal", "/sign-in")
  })

  it("should give error when passwords are not the same", () => {
    cy.data(passwordTextfield).type("test12345")
    cy.data(confirmPasswordTextfield).type("test123456")
    cy.data(submitPasswordBtn).click()
    cy.data(errorPopup).contains("Fill in equal passwords.")
  })

  it("should give error when new password is too short", () => {
    cy.data(passwordTextfield).type(shortPassword)
    cy.data(confirmPasswordTextfield).type(shortPassword)
    cy.data(submitPasswordBtn).click()
    cy.data(errorPopup).contains(
      "Password is too short, has to be at least 6 characters."
    )
  })
})
