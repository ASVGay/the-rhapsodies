import { COLORS } from "../../support/colors"

describe("on the reset password page", () => {
  // -------------------------------------------------------------- Variables
  const buttonSubmitNewPassword = "button-submit-new-password"
  const inputPasswordError = "input-password-error"
  const inputPassword = "input-password"
  const inputConfirmationPasswordError = "input-confirmation-password-error"
  const inputConfirmationPassword = "input-confirmation-password"
  const password = Cypress.env("CYPRESS_ADMIN_PASSWORD")

  const enterAndSubmitPassword = () => {
    cy.data(inputPassword).type(password)
    cy.data(inputConfirmationPassword).type(password)
    cy.data(buttonSubmitNewPassword).click()
  }

  // -------------------------------------------------------------- Tests
  context("without an auth session", () => {
    beforeEach(() => {
      cy.logout()
      cy.visit("/forgot-password/reset")
    })
    it("should redirect to sign-in", () => {
      cy.location("pathname").should("equal", "/sign-in")
    })
  })

  context("with an auth session", () => {
    beforeEach(() => {
      cy.login()
      cy.visit("/forgot-password/reset")
    })

    it("should stay on the page", () => {
      cy.location("pathname").should("equal", "/forgot-password/reset")
    })

    context("the form", () => {
      it("should show error if no password value", () => {
        cy.data(buttonSubmitNewPassword).click()
        cy.data(inputPasswordError).should("contain.text", "Please provide a password")
        cy.data(inputPassword).should("have.css", "outline-color", COLORS.red[400])
      })

      it("should show error if too short password value", () => {
        cy.data(inputPassword).type("1234")
        cy.data(buttonSubmitNewPassword).click()
        cy.data(inputPasswordError).should("contain.text", "six characters")
        cy.data(inputPassword).should("have.css", "outline-color", COLORS.red[400])
      })

      it("should show error with no confirmation password value", () => {
        cy.data(buttonSubmitNewPassword).click()
        cy.data(inputConfirmationPasswordError).should(
          "contain.text",
          "Please provide your password",
        )
        cy.data(inputConfirmationPassword).should("have.css", "outline-color", COLORS.red[400])
      })

      it("should show error with not equal confirmation password value", () => {
        cy.data(inputPassword).type("123456")
        cy.data(inputConfirmationPassword).type("1234567")
        cy.data(buttonSubmitNewPassword).click()
        cy.data(inputConfirmationPasswordError).should("contain.text", "do not match")
        cy.data(inputConfirmationPassword).should("have.css", "outline-color", COLORS.red[400])
      })

      it("should update password with correct values", () => {
        cy.intercept("/auth/v1/user", (req) => {
          expect(req.method).to.equal("PUT")
          expect(req.body.password).to.equal(password)
          req.reply(200, {})
        })
        cy.data(inputPassword).type(password)
        cy.data(inputConfirmationPassword).type(password)
        cy.data(buttonSubmitNewPassword).click()
      })
    })

    context("on updating password", () => {
      context("with fail", () => {
        it("should show an error toast", () => {
          cy.intercept("/auth/v1/user", { forceNetworkError: true }).as("update-password")
          enterAndSubmitPassword()
          cy.wait("@update-password")
          cy.get(".Toastify")
            .get("#1")
            .should("be.visible")
            .should("have.class", "Toastify__toast--error")
        })
      })

      context("with success", () => {
        it("should show an success toast", () => {
          cy.intercept("/auth/v1/user", (req) => req.reply(200, {})).as("update-password")
          enterAndSubmitPassword()
          cy.wait("@update-password")
          cy.get(".Toastify")
            .get("#1")
            .should("be.visible")
            .should("have.class", "Toastify__toast--success")
            .should("have.text", "Password successfully updated!")
        })

        it("should redirect to home", () => {
          cy.intercept("/auth/v1/user", (req) => req.reply(200, {})).as("update-password")
          enterAndSubmitPassword()
          cy.wait("@update-password")
          cy.location("pathname").should("equal", "/")
        })
      })
    })
  })
})
