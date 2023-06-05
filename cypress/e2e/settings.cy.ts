import {testErrorHandlingChangePassword} from "./helpers/change-password.helper";

const icons8Link = "https://icons8.com"

const passwordTextfield = "change-password-textfield"
const confirmPasswordTextfield = "confirm-password-textfield"
const submitPasswordBtn = "submit-password-btn"
const shortPassword = "test"
const longPassword = "test1234"
describe("the settings page", () => {
  beforeEach(() => {
    cy.login()
    cy.visit("/settings")
  })

  it("should somewhere contain a link to Icons  8", () => {
    cy.get("a[href]").each(($el) => {
      cy.wrap($el.attr("href")).should("include", icons8Link)
    })
  })

  context("when changing password", () => {
      testErrorHandlingChangePassword(submitPasswordBtn, confirmPasswordTextfield, passwordTextfield, shortPassword)

    it("Should show error when server returns an error", () => {
      cy.intercept("PUT", "/auth/v1/user", (req) => {
        req.reply({
          statusCode: 500,
        })
      }).as("interceptedRequest")
      cy.data(passwordTextfield).type(longPassword)
      cy.data(confirmPasswordTextfield).type(longPassword)
      cy.data(submitPasswordBtn).click()
      cy.data("submit-password-err").contains("Change password failed, try again")
    })

    it("Should show alert when trying to change password", () => {
      cy.data(passwordTextfield).type(longPassword)
      cy.data(confirmPasswordTextfield).type(longPassword)
      cy.data(submitPasswordBtn).click()
      cy.on("window:alert", (text) => {
        expect(text).to.contains("Are you sure you want to change your password?")
      })
    })
  })
})
