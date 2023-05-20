const suggestionId = Cypress.env("CYPRESS_SUGGESTION_ID")

describe("suggestion detail page", () => {

  context("suggestion exists", () => {
    beforeEach(() => {
      cy.login()
      cy.visit(`/suggestions/${suggestionId}`)
    })

    it("should contain a suggestion", () => {
      cy.data("suggestion").should("exist")
    })

  })

  context("suggestion doesn't exists", () => {
    before(() => {
      cy.login()
    })

    it("should display 404 page", () => {
      cy.request({ url: "/suggestions/non-existing-id", failOnStatusCode: false })
        .its("status").should("equal", 404)
    })

  })

})
