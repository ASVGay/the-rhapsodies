const suggestionId = Cypress.env("CYPRESS_SUGGESTION_ID")
const username = Cypress.env("CYPRESS_ADMIN_DISPLAY_NAME")

describe("suggestion detail page", () => {
  context("suggestion exists", () => {
    beforeEach(() => {
      cy.login()
      cy.visit(`/suggestions/${suggestionId}`)
    })

    it("should contain a suggestion", () => {
      cy.data("suggestion").should("exist")
    })

    it("should add or remove username from division", () => {
      cy.data("division")
        .first()
        .then((division) => {
          const criteria = division.text().includes(username)
          cy.intercept("GET", "/rest/v1/song*").as("updateSuggestion")
          cy.data("instrument").first().click().wait("@updateSuggestion")
          criteria
            ? cy.data("division").first().should(`not.contain.text`, username)
            : cy.data("division").first().should(`contain.text`, username)
        })
    })

    it("should error when failing to fetch suggestions after updating division", () => {
      cy.intercept("GET", "/rest/v1/song*", { statusCode: 500 })
      cy.wait(500).data("instrument").first().click()
      cy.data("suggestion-error").should("be.visible")
    })

    it("should error when failing to update division", () => {
      cy.intercept("DELETE", "/rest/v1/division*", { forceNetworkError: true }).as("changeDivision")
      cy.intercept("POST", "/rest/v1/division*", { forceNetworkError: true }).as("changeDivision")

      cy.data("division")
        .first()
        .then(() => {
          cy.data("instrument").first().click().wait("@changeDivision")

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

    it("should not disable button if text is correct", () => {
      cy.data("suggestion-delete-icon").click({ force: true })
      cy.data("delete-suggestion-continue-button").click()
      cy.data("input-delete-suggestion").type("Rens")
      cy.data("delete-suggestion-final-button").should("not.be.disabled")
    })

    it("should disable button when text is incorrect", () => {
      cy.data("suggestion-delete-icon").click({ force: true })
      cy.data("delete-suggestion-continue-button").click()
      cy.data("input-delete-suggestion").type("Wrong text")
      cy.data("delete-suggestion-final-button").should("be.disabled")
    })

    it("should show toast when failing to delete", () => {
      cy.data("suggestion-delete-icon").click({ force: true })
      cy.intercept("/rest/v1/song*", {
        statusCode: 500,
        body: { error: "error" },
      })
      cy.data("delete-suggestion-continue-button").click()
      cy.data("input-delete-suggestion").type("Rens")
      cy.data("delete-suggestion-final-button").click()
      cy.on("window:confirm", () => true)
      cy.get(".Toastify")
        .get("#1")
        .get(".Toastify__toast-body")
        .should("have.text", "We couldn't delete the suggestion, try again later.")
    })
  })
})
