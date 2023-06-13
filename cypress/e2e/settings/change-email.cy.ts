import { interceptIndefinitely } from "../helpers/interception.helper"

const errorResponseChangeEmail = {
  statusCode: 401,
  body: {
    error: "Error",
  },
}

describe("on the change email page", () => {
  const buttonSubmitNewEmail = "button-submit-new-email"
  const inputCurrentPassword = "input-current-password"
  const errorCurrentPassword = "input-current-password-error"
  const inputNewEmail = "input-new-email"
  const errorNewEmail = "input-new-email-error"
  const currentPassword = Cypress.env("CYPRESS_OLD_PASSWORD")
  const emailAddress = Cypress.env("CYPRESS_OLD_EMAIL")

  const submitCorrectData = () => {
    cy.data(inputNewEmail).type(emailAddress)
    cy.data(inputCurrentPassword).type(currentPassword)
    cy.data(buttonSubmitNewEmail).click()
  }

  before(() => {
    Cypress.Keyboard.defaults({
      keystrokeDelay: 0,
    })
  })

  beforeEach(() => {
    cy.login()
    cy.visit("/settings/change-email")
    cy.intercept("GET", "/_next/**/**/**.json").as("manifest")
    cy.wait("@manifest")
  })

  it("should render all form elements correctly", () => {
    cy.data(inputCurrentPassword).should("be.visible")
    cy.data(inputNewEmail).should("be.visible")
    cy.data(buttonSubmitNewEmail).should("be.visible")
  })

  it("should go back to settings on click of arrow", () => {
    cy.data("back-to-settings").click()
    cy.location("pathname").should("eq", "/settings")
  })

  context("with incorrect values", () => {
    it("should prevent submit event if no valid email", () => {
      cy.data(buttonSubmitNewEmail).click()
      const inputs = [inputCurrentPassword, inputNewEmail]

      inputs.forEach((input) => {
        cy.data(input).should("have.css", "outline-color", "rgb(209, 213, 219)")
      })

      cy.data(errorNewEmail).should("not.exist")
      cy.data(errorCurrentPassword).should("not.exist")
    })

    it("should show errors if no entered password", () => {
      cy.data(inputNewEmail).type("ex@mple")
      cy.data(buttonSubmitNewEmail).click()
      cy.data(inputCurrentPassword).should("have.css", "outline-color", "rgb(248, 113, 113)")
      cy.data(errorCurrentPassword).should("contain.text", "Please provide your current password")
    })

    it("should show error & toast if current password is not correct", () => {
      cy.data(inputNewEmail).type(emailAddress)
      cy.data(inputCurrentPassword).type("incorrect")
      cy.data(buttonSubmitNewEmail).click()
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
        .should("have.text", `Email is sent!`)
      cy.location("pathname").should("eq", "/settings")
    })

    it("should show toast if unsuccessful update", () => {
      // TODO
      // cy.intercept("*")
      // cy.intercept(`**/auth/v1/user**`, errorResponseChangeEmail)
      // submitCorrectData()
      //
      // cy.get(".Toastify")
      //   .get("#1")
      //   .should("be.visible")
      //   .should("have.class", "Toastify__toast--error")
      //   .get(".Toastify__toast-body")
      //   .should("contain.text", "Something went wrong")
    })

    it("should disable form & show spinner when loading", () => {
      const interception = interceptIndefinitely(
        `**/rest/v1/rpc/verify_user_password**`,
        errorResponseChangeEmail
      )
      submitCorrectData()
      cy.data("change-email-form")
        .within(() => {
          cy.data(inputCurrentPassword).should("be.disabled")
          cy.data(inputNewEmail).should("be.disabled")
          cy.data(buttonSubmitNewEmail).should("be.disabled")
          cy.data("spinner").should("be.visible")
        })
        .then(() => {
          interception.sendResponse()

          cy.data(inputCurrentPassword).should("not.be.disabled")
          cy.data(inputNewEmail).should("not.be.disabled")
          cy.data(buttonSubmitNewEmail).should("not.be.disabled")
          cy.data("spinner").should("not.exist")
        })
    })
  })

  context("the current email", () => {
    it("should be displayed if set", () => {
      cy.data("current-email").should("contain.text", emailAddress)
      cy.data("error-current-email").should("not.exist")
    })

    it("should display error if not set", () => {
      cy.logout()
      cy.login()
      cy.visit("/settings/change-email")
      cy.data("current-email").should("not.exist")
      cy.data("error-current-email").should("be.visible")
    })
  })
})
