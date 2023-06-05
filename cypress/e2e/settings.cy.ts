import {testErrorHandlingChangePassword} from "./account/helpers/change-password.helper";

const icons8Link = "https://icons8.com"

const passwordTextfield = "change-password-textfield"
const confirmPasswordTextfield = "confirm-password-textfield"
const submitPasswordBtn = "submit-password-btn"
const shortPassword = "test"
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
  })
})
