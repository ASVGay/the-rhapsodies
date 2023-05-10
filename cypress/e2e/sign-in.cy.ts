const emailTextField = "sign-in-email"
const passwordTextField = "sign-in-password"
const signInSubmitBtn = "sign-in-submit-btn"
const errorPopupTxt = "error-popup-sign-in"
const validTestPassword = "test12345"
const invalidInput = "test"
const emailInCorrectFormat = "test@test.nl"
const unusedEmail = "nosuchemail123455678@email.com"
const wrongCredentials = "Wrong credentials."
const validEmail = Cypress.env("user_email")
const validEmailFirstTimeUser = Cypress.env("user_first_time_email")
const validPassword = Cypress.env("user_password")
const validPasswordFirstTimeUser = Cypress.env("user_first_time_password")

describe("Sign-in", () => {
  beforeEach(() => {
    cy.logout()
    cy.visit("/sign-in")
  })

  context("on succesfull login", () => {
    it("Should navigate to home when not first time user", () => {
      cy.data(emailTextField).type(validEmail)
      cy.data(passwordTextField).type(validPassword)
      cy.data(signInSubmitBtn).click()
      cy.location("pathname").should("equal", "/")
    })

    it("should navigate to change password when first time user", () => {
      cy.data(emailTextField).type(validEmailFirstTimeUser)
      cy.data(passwordTextField).type(validPasswordFirstTimeUser)
      cy.data(signInSubmitBtn).click()
      cy.location("pathname").should("equal", "/change-password")
    })
  })

  context("Error handling sign-in", () => {
    it('Should return "Please fill in a valid email." when email is not valid', () => {
      cy.data(emailTextField).type(invalidInput)
      cy.data(passwordTextField).type(validPassword)
      cy.data(signInSubmitBtn).click()
      cy.data(errorPopupTxt).contains("Please fill in a valid email.")
    })

    it(`Should return "Wrong credentials." when signing in with non existing email`, () => {
      cy.data(emailTextField).type(unusedEmail)
      cy.data(passwordTextField).type(validPassword)
      cy.data(signInSubmitBtn).click()
      cy.data(errorPopupTxt).contains(wrongCredentials)
    })

    it('Should return "Password is missing." when password is empty', () => {
      cy.data(emailTextField).type(emailInCorrectFormat)
      cy.data(signInSubmitBtn).click()
      cy.data(errorPopupTxt).contains("Password is missing")
    })
  })
})
