const suggestionId = Cypress.env("CYPRESS_SUGGESTION_ID")
const username = Cypress.env("CYPRESS_USERNAME_OLD")

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
          cy.data("instrument")
            .first()
            .click()
            .wait("@updateSuggestion")
          criteria
            ? cy.data("division").first().should(`not.contain.text`, username)
            : cy.data("division").first().should(`contain.text`, username)
        })
    })

    it("should redirect to suggestions on pressing the exit button", () => {
      cy.data("suggestion-x-icon").click()
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
})
