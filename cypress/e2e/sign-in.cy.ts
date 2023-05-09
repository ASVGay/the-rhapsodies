const emailTextField = "sign-in-email"
const passwordTextField = "sign-in-password"
const signInSubmitBtn = "sign-in-submit-btn"
const errorPopupTxt = "error-popup-sign-in"
const validPassword = "test123"
const invalidInput = "test"
const emailInCorrectFormat = "test@test.nl"
const unusedEmail = "nosuchemail123455678@email.com"
const wrongCredentials = "Wrong credentials."

describe("Sign-in", () => {
  context("Error handling sign-in", () => {
    beforeEach(() => {
      cy.logout()
      cy.visit("/sign-in")
    })

    it('Should return "Please fill in a valid email." when email is not valid', () => {
      cy.data(emailTextField).type(invalidInput)
      cy.data(passwordTextField).type(validPassword)
      cy.data(signInSubmitBtn).click()
      cy.data(errorPopupTxt).should(
        "contain.text",
        "Please fill in a valid email."
      )
    })

    it(`Should return "Wrong credentials." when signing in with non existing email`, () => {
      cy.data(emailTextField).type(unusedEmail)
      cy.data(passwordTextField).type(validPassword)
      cy.data(signInSubmitBtn).click()
      cy.data(errorPopupTxt).should("contain.text", wrongCredentials)
    })

    it('Should return "Password is missing." when password is empty', () => {
      cy.data(emailTextField).type(emailInCorrectFormat)
      cy.data(signInSubmitBtn).click()
      cy.data(errorPopupTxt).should("contain.text", "Password is missing")
    })
  })
})
