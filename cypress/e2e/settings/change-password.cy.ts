import { interceptIndefinitely } from "../helpers/interception.helper"
import { COLORS } from "../../support/colors"

describe("the change password page", () => {
  const environment = Cypress.env("CYPRESS_ENV")
  const buttonSubmitNewPassword = "button-submit-new-password"
  const inputCurrentPassword = "input-current-password"
  const inputNewPassword = "input-new-password"
  const inputConfirmationPassword = "input-confirmation-password"
  const errorNewPassword = "input-new-password-error"
  const errorConfirmationPassword = "input-confirmation-password-error"
  const errorCurrentPassword = "input-current-password-error"
  const currentPassword = Cypress.env("CYPRESS_ADMIN_PASSWORD")
  const errorResponse = {
    statusCode: 401,
    body: {
      error: "Error",
    },
  }
  const submitCorrectData = () => {
    cy.data(inputCurrentPassword).type(currentPassword)
    cy.data(inputNewPassword).type(currentPassword)
    cy.data(inputConfirmationPassword).type(currentPassword)
    cy.data(buttonSubmitNewPassword).click()
  }

  before(() => {
    Cypress.Keyboard.defaults({
      keystrokeDelay: 0,
    })
  })

  beforeEach(() => {
    cy.login()
    cy.visit("/settings/change-password")
    cy.intercept("GET", "/_next/**/**/**.json").as("manifest")
    cy.wait("@manifest")
  })

  it("should render all form elements correctly", () => {
    cy.data(inputCurrentPassword).should("be.visible")
    cy.data(inputNewPassword).should("be.visible")
    cy.data(inputConfirmationPassword).should("be.visible")
    cy.data(buttonSubmitNewPassword).should("be.visible")
  })

  it("should go back to settings on click of arrow", () => {
    cy.data("back-to-settings").click()
    cy.location("pathname").should("eq", "/settings")
  })

  context("with incorrect values", () => {
    it("should show errors if no password values", () => {
      cy.data(buttonSubmitNewPassword).click()
      const inputs = [inputCurrentPassword, inputNewPassword, inputConfirmationPassword]

      inputs.forEach((input) => {
        cy.data(input).should("have.css", "outline-color", COLORS.red[400])
      })

      cy.data(errorCurrentPassword).should("contain.text", "Please provide your current password")
      cy.data(errorNewPassword).should("contain.text", "Please provide a password")
      cy.data(errorConfirmationPassword).should("contain.text", "Please provide your password")
    })

    it("should show error if new password is too short", () => {
      cy.data(inputNewPassword).type("12")
      cy.data(buttonSubmitNewPassword).click()
      cy.data(inputNewPassword).should("have.css", "outline-color", COLORS.red[400])
      cy.data(errorNewPassword).should("contain.text", "six characters")
    })

    it("should show error if passwords are not equal", () => {
      cy.data(inputNewPassword).type("12")
      cy.data(inputConfirmationPassword).type("1")
      cy.data(buttonSubmitNewPassword).click()
      cy.data(inputConfirmationPassword).should("have.css", "outline-color", COLORS.red[400])
      cy.data(errorConfirmationPassword).should("contain.text", "not match")
    })

    it("should show error & toast if current password is not correct", () => {
      cy.data(inputCurrentPassword).type("incorrect")
      cy.data(inputNewPassword).type(currentPassword)
      cy.data(inputConfirmationPassword).type(currentPassword)
      cy.data(buttonSubmitNewPassword).click()
      cy.data(inputCurrentPassword).should("have.css", "outline-color", COLORS.red[400])
      cy.data(errorCurrentPassword).should("contain.text", "Incorrect password")
      cy.get(".Toastify")
        .get("#incorrect-password")
        .should("be.visible")
        .should("have.class", "Toastify__toast--error")
        .should("contain.text", "Please fill in your current password correctly")
    })
  })

  context("with correct values", () => {
    it("should redirect & show toast if successful update", () => {
      submitCorrectData()

      // If running local, the password change will be successful
      if (environment == "local") {
        cy.get(".Toastify")
          .get("#1")
          .should("be.visible")
          .should("have.class", "Toastify__toast--success")
          .should("have.text", "Password successfully changed!")
        cy.location("pathname").should("eq", "/settings")
      } else {
        // If running in GitHub Actions, the password change will be unsuccessful
        // since we cannot change the password to the same as the current one
        cy.get(".Toastify")
          .get("#1")
          .should("be.visible")
          .should("have.class", "Toastify__toast--error")
          .should("contain.text", "must be different")
      }
    })

    it("should show toast if unsuccessful update", () => {
      cy.intercept("/auth/v1/user", errorResponse)
      submitCorrectData()

      cy.get(".Toastify")
        .get("#1")
        .should("be.visible")
        .should("have.class", "Toastify__toast--error")
        .should("contain.text", "Something went wrong")
    })

    it("should disable form & show spinner when loading", () => {
      const interception = interceptIndefinitely("/auth/v1/user", errorResponse)
      submitCorrectData()
      cy.data("change-password-form")
        .within(() => {
          cy.data(inputCurrentPassword).should("be.disabled")
          cy.data(inputNewPassword).should("be.disabled")
          cy.data(inputConfirmationPassword).should("be.disabled")
          cy.data(buttonSubmitNewPassword).should("be.disabled")
          cy.data("spinner").should("be.visible")
        })
        .then(() => {
          interception.sendResponse()

          cy.data(inputCurrentPassword).should("not.be.disabled")
          cy.data(inputNewPassword).should("not.be.disabled")
          cy.data(inputConfirmationPassword).should("not.be.disabled")
          cy.data(buttonSubmitNewPassword).should("not.be.disabled")
          cy.data("spinner").should("not.exist")
        })
    })
  })
})
