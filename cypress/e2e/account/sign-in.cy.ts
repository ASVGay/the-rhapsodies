const emailTextField = "sign-in-email"
const passwordTextField = "sign-in-password"
const signInSubmitBtn = "sign-in-submit-btn"
const errorPopupTxt = "sign-in-err"
const emailInCorrectFormat = "test@test.nl"
const unusedEmail = "nosuchemail123455678@email.com"
const wrongCredentials = "Invalid login credentials"
const passwordIsMissing = "Password is required"
const oldUserEmail = Cypress.env("CYPRESS_OLD_EMAIL")
const oldUserPassword = Cypress.env("CYPRESS_OLD_PASSWORD")
const newUserEmail = Cypress.env("CYPRESS_NEW_EMAIL")
const newUserPassword = Cypress.env("CYPRESS_NEW_PASSWORD")

const forgotPassword = "forgot-password"
describe("Sign-in", () => {
  beforeEach(() => {
    cy.logout()
    cy.visit("/sign-in")
  })

  context("on successful login", () => {
    it("Should navigate to home when not first time user", () => {
      cy.data(emailTextField).type(oldUserEmail)
      cy.data(passwordTextField).type(oldUserPassword)
      cy.data(signInSubmitBtn).click()
      cy.location("pathname").should("equal", "/")
    })

    it("should navigate to change password when first time user", () => {
      cy.data(emailTextField).type(newUserEmail)
      cy.data(passwordTextField).type(newUserPassword)
      cy.data(signInSubmitBtn).click()
      cy.location("pathname").should("equal", "/change-password")
    })
  })

  context("Error handling sign-in", () => {
    it(`Should return "Invalid login credentials." when signing in with non existing email`, () => {
      cy.data(emailTextField).type(unusedEmail)
      cy.data(passwordTextField).type(oldUserPassword)
      cy.data(signInSubmitBtn).click()
      cy.data(errorPopupTxt).contains(wrongCredentials)
    })

    it('Should return "Password is missing." when password is empty', () => {
      cy.data(emailTextField).type(emailInCorrectFormat)
      cy.data(signInSubmitBtn).click()
      cy.data(`${passwordTextField}-error`).contains(passwordIsMissing)
    })
  })
})

describe("forgot password", () => {
  it("should go to forgot password if clicked on forgot password", () => {
    cy.visit("/sign-in")
    cy.data(forgotPassword).click()
    cy.location("pathname").should("equal", "/forgot-password")
  })

  it("should show error if reset password link has an error", () => {
    cy.visit(
      "/sign-in#error=unauthorized_client&error_code=401&error_description=Email+link+is+invalid+or+has+expired"
    )
    cy.get(".Toastify")
      .get("#error_description")
      .get(".Toastify__toast-body")
      .should("have.text", "Email link is invalid or has expired")
  })
})
