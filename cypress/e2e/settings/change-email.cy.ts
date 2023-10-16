import { interceptIndefinitely } from "../helpers/interception.helper"
import { getSbToken } from "../../support/commands"

const errorResponseChangeEmail = {
  statusCode: 401,
  body: {
    error: "Error",
  },
}

const successResponseChangeEmail = {
  statusCode: 200,
  body: {},
}

describe("on the change email page", () => {
  const buttonSubmitNewEmail = "button-submit-new-email"
  const inputCurrentPassword = "input-current-password"
  const errorCurrentPassword = "input-current-password-error"
  const inputNewEmail = "input-new-email"
  const errorNewEmail = "input-new-email-error"
  const changeEmailConfirmation = "change-email-confirmation"
  const changeEmailForm = "change-email-form"
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
        cy.data(input).should("not.have.css", "outline-color", "rgb(248, 113, 113)")
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
    it("should show toast if email could not be sent", () => {
      cy.intercept(`**/auth/v1/user**`, errorResponseChangeEmail)
      submitCorrectData()

      cy.get(".Toastify")
        .get("#1")
        .should("be.visible")
        .should("have.class", "Toastify__toast--error")
        .get(".Toastify__toast-body")
        .should("contain.text", "Error")
    })

    it("should disable form & show spinner when loading", () => {
      const interception = interceptIndefinitely(
        `**/rest/v1/rpc/verify_user_password**`,
        errorResponseChangeEmail,
      )
      submitCorrectData()
      cy.data(changeEmailForm)
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

    it("should show change email confirmation if email is sent", () => {
      cy.data(changeEmailConfirmation).should("not.exist")
      cy.intercept(`**/auth/v1/user**`, successResponseChangeEmail)
      submitCorrectData()
      cy.data(changeEmailConfirmation).should("exist")
    })

    context("on the confirmation page", () => {
      beforeEach(() => {
        cy.intercept(`**/auth/v1/user**`, successResponseChangeEmail)
        submitCorrectData()
      })
      it("should contain the email and resend email on click", () => {
        cy.data("email-value").should("have.text", emailAddress)
        cy.data("resend-email").click()
        cy.get(".Toastify")
          .get("#1")
          .get(".Toastify__toast-body")
          .should(
            "have.text",
            "An email has been sent. Check your spam folder if you cannot find it.",
          )
      })

      it("should show the form on click of change email", () => {
        cy.data(changeEmailForm).should("not.exist")
        cy.data("edit-email").click()
        cy.data(changeEmailForm).should("exist")
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

describe("on change email page with hash params", () => {
  it("should show toast if going to page with refresh token", () => {
    cy.login()
    cy.wait(300) // wait for login to complete
    cy.getCookie(getSbToken()).then((cookie) => {
      const refreshToken = JSON.parse(decodeURIComponent(cookie.value))[1]
      cy.visit(`/settings/change-email#refresh_token=${refreshToken}`)
      cy.get(".Toastify")
        .get("#update-success")
        .get(".Toastify__toast-body")
        .should("have.text", "Your email has successfully been updated!")
    })
  })

  it("should show redirect to sign in if going to page with error hash", () => {
    cy.visit(
      "/settings/change-email#error=unauthorized_client&error_code=401&error_description=Email+link+is+invalid+or+has+expired",
    )
    cy.location("pathname").should("eq", "/sign-in")
    cy.get(".Toastify")
      .get("#error_description")
      .get(".Toastify__toast-body")
      .should("have.text", "Email link is invalid or has expired")
  })
})
