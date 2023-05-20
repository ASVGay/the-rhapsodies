const suggestionId = Cypress.env("suggestion_id")

describe("suggestion detail page", () => {

  context("suggestion exists", () => {
    beforeEach(() => {
      cy.login()
      cy.visit(`/suggestions/${suggestionId}`)
    })

    it("should contain a suggestion", () => {
      cy.data("suggestion").should("exist")
    })

    it("should call firestore on update role", () => {
      const spy = cy.spy()
      cy.intercept('https://firestore.googleapis.com/**', spy)
      cy.wait(2000)
        .then(() => expect(spy).to.have.been.called)
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
