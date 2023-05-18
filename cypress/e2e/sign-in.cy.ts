const emailTextField = "sign-in-email"
const passwordTextField = "sign-in-password"
const signInSubmitBtn = "sign-in-submit-btn"
const errorPopupTxt = "error-popup-sign-in"
const invalidInput = "test"
const emailInCorrectFormat = "test@test.nl"
const unusedEmail = "nosuchemail123455678@email.com"
const wrongCredentials = "Invalid login credentials"
const oldUserEmail = Cypress.env("CYPRESS_OLD_EMAIL")
const oldUserPassword = Cypress.env("CYPRESS_OLD_PASSWORD")
const newUserEmail = Cypress.env("CYPRESS_NEW_EMAIL")
const newUserPassword = Cypress.env("CYPRESS_NEW_PASSWORD")

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
    it('Should return "Invalid login credentials" when email is not valid', () => {
      cy.data(emailTextField).type(invalidInput)
      cy.data(passwordTextField).type(oldUserPassword)
      cy.data(signInSubmitBtn).click()
      cy.data(errorPopupTxt).contains(wrongCredentials)
    })

    it(`Should return "Wrong credentials." when signing in with non existing email`, () => {
      cy.data(emailTextField).type(unusedEmail)
      cy.data(passwordTextField).type(oldUserPassword)
      cy.data(signInSubmitBtn).click()
      cy.data(errorPopupTxt).contains(wrongCredentials)
    })

    it('Should return "Password is missing." when password is empty', () => {
      cy.data(emailTextField).type(emailInCorrectFormat)
      cy.data(signInSubmitBtn).click()
      cy.data(errorPopupTxt).contains(wrongCredentials)
    })
  })
})
