import { APP_SETTINGS } from "@/constants/app-settings"

const suggestionId = Cypress.env("CYPRESS_SUGGESTION_ID")
const username = Cypress.env("CYPRESS_ADMIN_DISPLAY_NAME")

describe("suggestion detail page", () => {
  context("suggestion exists", () => {
    beforeEach(() => {
      cy.intercept("GET", "/_next/**/**/**.json").as("manifest")
      cy.login()
      cy.visit(`/suggestions/${suggestionId}`)
      cy.wait("@manifest")
    })

    it("should contain a suggestion", () => {
      cy.data("suggestion").should("exist")
    })

    it("should add or remove username from division", () => {
      cy.data("division")
        .first()
        .then((division) => {
          const criteria = division.text().includes(username)
          cy.intercept("/rest/v1/song*").as("updateSuggestion")
          // Click on the first instrument
          cy.data("instrument-0").clickWhenClickable()
          cy.wait("@updateSuggestion")
          criteria
            ? cy.data("division").first().should(`not.contain.text`, username)
            : cy.data("division").first().should(`contain.text`, username)
        })
    })

    it("should error when failing to fetch suggestions after updating division", () => {
      cy.intercept("GET", "/rest/v1/song*", { statusCode: 500 })
      cy.data("instrument-0").clickWhenClickable()
      cy.data("suggestion-error").should("be.visible")
    })

    it("should error when failing to update division", () => {
      cy.intercept("DELETE", "/rest/v1/division*", { forceNetworkError: true }).as("changeDivision")
      cy.intercept("POST", "/rest/v1/division*", { forceNetworkError: true }).as("changeDivision")
      cy.data("division")
        .first()
        .then(() => {
          cy.data("instrument-0").clickWhenClickable()
          cy.wait("@changeDivision")

          cy.get(".Toastify").get("#1").should("be.visible")
        })
    })

    it("should redirect to suggestions on pressing the exit button", () => {
      cy.data("suggestion-x-icon")
        .click()
        .then(() => {
          cy.location("pathname").should("equal", "/suggestions")
        })
    })
  })

  context("suggestion doesn't exist", () => {
    before(() => {
      cy.login()
    })

    it("should display 404 page", () => {
      cy.request({ url: "/suggestions/non-existing-id", failOnStatusCode: false })
        .its("status")
        .should("equal", 404)
    })
  })

  context("user is admin", () => {
    beforeEach(() => {
      cy.login()
      cy.visit(`/suggestions/${suggestionId}`)
    })

    it("should display the admin action buttons", () => {
      cy.data("suggestion-delete-icon").should("exist")
      cy.data("suggestion-edit-icon").should("exist")
      cy.data("move-to-repertoire").should("exist")
    })

    it("should not delete song if delete button not held for full duration", () => {
      cy.intercept("/rest/v1/song*").as("deleteSuggestion")
      cy.data("suggestion-delete-icon").click({ force: true })
      // Hold the button for less than the required duration
      cy.data("delete-suggestion-button").trigger("mousedown")
      cy.wait(APP_SETTINGS.holdToDeleteDuration / 2) // Wait for half the duration
      cy.data("delete-suggestion-button").trigger("mouseup")
      // Verify that the suggestion is not deleted
      cy.request({
        url: `/suggestions/${suggestionId}`,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(200)
        expect(response.body.length).to.be.greaterThan(0) // Suggestion should still exist
      })
    })

    it("should show success toast if delete button held for full duration", () => {
      cy.intercept("/rest/v1/song*", { statusCode: 204 }).as("deleteSuggestion")
      cy.data("suggestion-delete-icon").click({ force: true })
      cy.data("delete-suggestion-button").trigger("mousedown")
      cy.wait(APP_SETTINGS.holdToDeleteDuration)
      cy.wait("@deleteSuggestion").then((interception) => {
        expect(interception.response.statusCode).to.equal(204)
      })

      // Verify that the suggestion is deleted
      cy.get(".Toastify").get("#1").should("have.text", "Suggestion successfully deleted.")
      cy.data("delete-suggestion-button").should("not.exist")
    })

    it("should show error toast when failing to delete", () => {
      cy.data("suggestion-delete-icon").click({ force: true })
      cy.intercept("/rest/v1/song*", {
        statusCode: 500,
        body: { error: "error" },
      })
      cy.data("delete-suggestion-button").trigger("mousedown")
      cy.wait(APP_SETTINGS.holdToDeleteDuration)
      cy.data("delete-suggestion-button").trigger("mouseup")
      cy.on("window:confirm", () => true)
      cy.get(".Toastify")
        .get("#1")
        .should("have.text", "We couldn't delete the suggestion, try again later.")
    })
  })
})
