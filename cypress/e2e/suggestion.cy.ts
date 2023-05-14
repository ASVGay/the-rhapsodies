const suggestionId = Cypress.env("suggestion_id")

describe("suggestion detail page", () => {

  context("suggestion exists", () => {
    before(() => {
      cy.visit(`/suggestions/${suggestionId}`)
    })

    it("should have the correct suggestion", () => {

    })

    it("should contain all required elements", () => {

    })

    it("should display progression-bar accordingly", () => {
      //progression-bar should have the right percentage
      //progression-bar should update to the right amount on click
      //amount/amount should check out
    })

    it("should add username on click if not already present", () => {

    })

    it("should remove username on click if already present", () => {

    })

  })

  context("suggestion doesn't exists", () => {
    before(() => {
      cy.visit("/suggestions/non-existing-id")
    })

    it("should display 404 page", () => {

    })

  })

})