const suggestionId = Cypress.env("suggestion_id")
const username = Cypress.env("username")

describe("suggestion detail page", () => {

  context("suggestion exists", () => {
    beforeEach(() => {
      cy.login()
      cy.visit(`/suggestions/${suggestionId}`)
    })

    it("should contain a suggestion", () => {
      cy.data("suggestion").should("exist")
    })

    it("should format date with long month and numeric day", () => {
      cy.get("#suggestion-date").should("exist")
        .invoke("text")
        .should("match", /^[A-Z][a-z]* [0-9]/)
    })

  })

  context("suggestion doesn't exists", () => {
    before(() => {
      cy.login()
      cy.visit("/suggestions/non-existing-id")
    })

    it("should display 404 page", () => {
      cy.data("404-page").should("be.visible")
    })

  })

})
