import { testErrorHandlingChangePassword } from "../helpers/change-password.helper"

const displayName = "New"
const newPassword = Cypress.env("CYPRESS_NEW_PASSWORD")
const displayNameTextfield = "set-name-textfield"
const passwordTextfield = "change-password-textfield"
const termsConditionsOverlay = "terms-and-conditions"
const termsConditionsCheckbox = "terms-conditions-checkbox"
const termsId = "terms"
const termsConditionsLink = "terms-conditions-link"
const confirmPasswordTextfield = "change-password-confirm-textfield"
const submitPasswordBtn = "submit-password-btn"
const shortPassword = "test"

describe("Change password", () => {
  beforeEach(() => {
    //this ensures the user is logged in when visiting the change password page
    cy.logout()
    cy.deleteNewUser()
    cy.login(true)
    cy.visit("/change-password")
  })

  it("should login when changing password", () => {
    cy.data(displayNameTextfield).type(displayName)
    cy.data(passwordTextfield).type(newPassword)
    cy.data(confirmPasswordTextfield).type(newPassword)
    cy.data(termsConditionsCheckbox).click()
    cy.data(submitPasswordBtn).click()
    cy.location("pathname").should("equal", "/")
  })

  it("should show terms and conditions when clicking on the link", () => {
    cy.data(termsConditionsLink).click()
    cy.data(termsConditionsOverlay).should("exist")
  })

  testErrorHandlingChangePassword(
    submitPasswordBtn,
    confirmPasswordTextfield,
    passwordTextfield,
    shortPassword,
    termsId
  )
})
