import {testErrorHandlingChangePassword} from "../helpers/change-password.helper";

const displayName = "New"
const newPassword = Cypress.env("CYPRESS_NEW_PASSWORD")
const errorPopup = "error-popup-change-password"
const displayNameTextfield = "set-name-textfield"
const passwordTextfield = "change-password-textfield"
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
    cy.data(submitPasswordBtn).click()
    cy.location("pathname").should("equal", "/")
  })

  testErrorHandlingChangePassword(submitPasswordBtn, confirmPasswordTextfield, passwordTextfield, shortPassword );
})
