import { User } from "../../support/user.enum"

describe("for the away mode", () => {
  const awayModeToggle = "away-mode-toggle"
  const settingsPageUrl = "/settings"
  const awayModeButton = "away-mode-button"
  const awayModePageUrl = "/settings/away-mode"
  const awayModeEnabledUrl = "/away-mode-enabled"
  const backToSettingsButton = "back-to-settings"
  describe("on the settings page", () => {
    beforeEach(() => {
      cy.login()
      cy.visit(settingsPageUrl)
    })

    it("should go to the toggle away mode page when the button is clicked", () => {
      cy.data(awayModeButton).click()
      cy.location("pathname").should("eq", awayModePageUrl)
    })
  })

  describe("on the toggle away mode page", () => {
    beforeEach(() => {
      cy.login(User.HIDDEN)
      cy.visit(awayModePageUrl)
      cy.wait(1000)
    })

    it("should enable the away mode", () => {
      cy.intercept("/rest/v1/member*", { statusCode: 204 }).as("hideUser")

      cy.data(awayModeToggle).within(() => cy.get("label").click())
      cy.wait("@hideUser")
      cy.data(awayModeToggle).within(() =>
        cy.get("label").within(() => cy.get("input").should("be.checked")),
      )

      cy.location("pathname").should("eq", awayModeEnabledUrl)

      cy.get(".Toastify")
        .get("#away-mode-enabled")
        .get(".Toastify__toast-body")
        .should("have.text", "Away Mode enabled. You are now invisible in the app.")
    })

    it("should show error if failed to enable away mode", () => {
      cy.intercept("/rest/v1/member*", { statusCode: 500 }).as("hideUser")

      cy.data(awayModeToggle).within(() => cy.get("label").click())
      cy.wait("@hideUser")
      cy.data(awayModeToggle).within(() =>
        cy.get("label").within(() => cy.get("input").should("not.be.checked")),
      )

      cy.get(".Toastify")
        .get("#away-mode-error")
        .get(".Toastify__toast-body")
        .should(
          "have.text",
          "Failed to enable Away Mode. Try logging in again if the problem persists.",
        )
      cy.location("pathname").should("eq", awayModePageUrl)
    })

    it("should have a button that goes back to the settings page", () => {
      cy.data(backToSettingsButton).click()
      cy.location("pathname").should("eq", settingsPageUrl)
    })
  })
})
