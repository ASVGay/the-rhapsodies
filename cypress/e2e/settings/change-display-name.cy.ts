import { interceptIndefinitely } from "../helpers/interception.helper"

describe("the change display name page", () => {
  const buttonSubmitNewDisplayName = "button-submit-new-display-name"
  const inputCurrentPassword = "input-current-password"
  const errorCurrentPassword = "input-current-password-error"
  const inputNewDisplayName = "input-new-display-name"
  const errorNewDisplayName = "input-new-display-name-error"
  const currentPassword = Cypress.env("CYPRESS_OLD_PASSWORD")
  const displayName = Cypress.env("CYPRESS_OLD_DISPLAY_NAME")

  const errorResponse = {
    statusCode: 401,
    body: {
      error: "Error",
    },
  }
  const submitCorrectData = () => {
    cy.data(inputNewDisplayName).type(displayName)
    cy.data(inputCurrentPassword).type(currentPassword)
    cy.data(buttonSubmitNewDisplayName).click()
  }

  before(() => {
    Cypress.Keyboard.defaults({
      keystrokeDelay: 0,
    })
  })

  beforeEach(() => {
    cy.login()
    cy.visit("/settings/change-display-name")
    cy.intercept("GET", "/_next/**/**/**.json").as("manifest")
    cy.wait("@manifest")
  })

  it("should render all form elements correctly", () => {
    cy.data(inputCurrentPassword).should("be.visible")
    cy.data(inputNewDisplayName).should("be.visible")
    cy.data(buttonSubmitNewDisplayName).should("be.visible")
  })

  it("should go back to settings on click of arrow", () => {
    cy.data("back-to-settings").click()
    cy.location("pathname").should("eq", "/settings")
  })

  context("with incorrect values", () => {
    it("should show errors if no entered values", () => {
      cy.data(buttonSubmitNewDisplayName).click()
      const inputs = [inputCurrentPassword, inputNewDisplayName]

      inputs.forEach((input) => {
        cy.data(input).should("have.css", "outline-color", "rgb(248, 113, 113)")
      })

      cy.data(errorNewDisplayName).should("contain.text", "Please provide a display name")
      cy.data(errorCurrentPassword).should("contain.text", "Please provide your current password")
    })

    it("should show error & toast if current password is not correct", () => {
      cy.data(inputNewDisplayName).type(displayName)
      cy.data(inputCurrentPassword).type("incorrect")
      cy.data(buttonSubmitNewDisplayName).click()
      cy.data(inputCurrentPassword).should("have.css", "outline-color", "rgb(248, 113, 113)")
      cy.data(errorCurrentPassword).should("contain.text", "Incorrect password")
      cy.get(".Toastify")
        .get("#incorrect-password")
        .should("be.visible")
        .should("have.class", "Toastify__toast--error")
        .get(".Toastify__toast-body")
        .should("contain.text", "Please fill in your current password correctly")
    })
  })

  context("with correct values", () => {
    it("should redirect & show toast if successful update", () => {
      submitCorrectData()

      cy.get(".Toastify")
        .get("#1")
        .should("be.visible")
        .should("have.class", "Toastify__toast--success")
        .get(".Toastify__toast-body")
        .should("have.text", `Display name successfully changed to ${displayName}!`)
      cy.location("pathname").should("eq", "/settings")
    })

    it("should show toast if unsuccessful update", () => {
      cy.intercept(`**/rest/v1/member**`, errorResponse)
      submitCorrectData()

      cy.get(".Toastify")
        .get("#1")
        .should("be.visible")
        .should("have.class", "Toastify__toast--error")
        .get(".Toastify__toast-body")
        .should("contain.text", "Something went wrong")
    })

    it("should disable form & show spinner when loading", () => {
      const interception = interceptIndefinitely(`**/rest/v1/member**`, errorResponse)
      submitCorrectData()
      cy.data("change-display-name-form")
        .within(() => {
          cy.data(inputCurrentPassword).should("be.disabled")
          cy.data(inputNewDisplayName).should("be.disabled")
          cy.data(buttonSubmitNewDisplayName).should("be.disabled")
          cy.data("spinner").should("be.visible")
        })
        .then(() => {
          interception.sendResponse()

          cy.data(inputCurrentPassword).should("not.be.disabled")
          cy.data(inputNewDisplayName).should("not.be.disabled")
          cy.data(buttonSubmitNewDisplayName).should("not.be.disabled")
          cy.data("spinner").should("not.exist")
        })
    })
  })
})
