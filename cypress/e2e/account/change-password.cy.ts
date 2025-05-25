import { testErrorHandlingChangePassword } from "../helpers/change-password.helper"
import { User } from "../../support/user.enum"

const displayName = "New"
const newPassword = Cypress.env("CYPRESS_NEW_PASSWORD")
const displayNameTextField = "set-name-text-field"
const passwordTextField = "change-password-text-field"
const termsConditionsOverlay = "terms-and-conditions"
const termsConditionsCheckbox = "terms-conditions-checkbox"
const termsId = "terms"
const termsConditionsLink = "terms-conditions-link"
const privacyPolicyLink = "privacy-policy-link"
const privacyPolicyOverlay = "privacy-policy"
const confirmPasswordTextField = "change-password-confirm-text-field"
const submitPasswordBtn = "submit-password-btn"
const submitPasswordErr = "submit-password-err"
const shortPassword = "test"

describe("Change password", () => {
  beforeEach(() => {
    //this ensures the user is logged in when visiting the change password page
    cy.logout()
    cy.deleteNewUser()
    cy.login(User.NEW)
    cy.visit("/change-password")
  })

  it("should login or give error when changing password", () => {
    cy.intercept("PUT", "/auth/v1/user").as("changePassword")

    cy.data(displayNameTextField).type(displayName)
    cy.data(passwordTextField).type(newPassword)
    cy.data(confirmPasswordTextField).type(newPassword)
    cy.data(termsConditionsCheckbox).click()
    cy.data(submitPasswordBtn).click()
    // The user should get error 422
    // since we cannot change the password to the same as the current one
    cy.wait("@changePassword").its("response.statusCode").should("eq", 422)
    cy.data(submitPasswordErr).should("exist")
    cy.data(submitPasswordErr).should(
      "contain.text",
      "New password should be different from the old password",
    )
  })

  it("should show terms and conditions when clicking on the link", () => {
    cy.data(termsConditionsLink).click()
    cy.data(termsConditionsOverlay).should("exist")
  })

  it("should show privacy policy when clicking on the link", () => {
    cy.data(privacyPolicyLink).click()
    cy.data(privacyPolicyOverlay).should("exist")
  })

  testErrorHandlingChangePassword(
    submitPasswordBtn,
    confirmPasswordTextField,
    passwordTextField,
    shortPassword,
    termsId,
  )
})
