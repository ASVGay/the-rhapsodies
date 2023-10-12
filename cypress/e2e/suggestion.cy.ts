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
          cy.data("instrument").first().click().wait("@updateSuggestion")
          criteria
            ? cy.data("division").first().should(`not.contain.text`, username)
            : cy.data("division").first().should(`contain.text`, username)
        })
    })

    it("should error when failing to fetch suggestions after updating division", () => {
      cy.data("division")
        .first()
        .then(() => {
          cy.intercept("GET", "/rest/v1/song*", { forceNetworkError: true }).as("updateSuggestion")
          cy.data("instrument").first().click().wait("@updateSuggestion")
          cy.data("suggestion-error").should("be.visible")
        })
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

  context("user is not admin", () => {
    before(() => {
      cy.removeUserAdminPrivileges()
      cy.login()
      cy.visit(`/suggestions/${suggestionId}`)
    })

    afterEach(() => cy.giveUserAdminPrivileges())

    it("should not display the delete suggestion button", () => {
      // Check if page is loaded correctly
      cy.data("suggestion").should("be.visible")
      cy.data("suggestion-delete-icon").should("not.exist")
    })
  })

  context("user is admin", () => {
    beforeEach(() => {
      cy.giveUserAdminPrivileges()
      cy.login()
      cy.visit(`/suggestions/${suggestionId}`)
    })

    it("should display the delete suggestion button", () => {
      cy.data("suggestion-delete-icon").should("exist")
    })
  })
})
