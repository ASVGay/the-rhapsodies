describe("suggestions page", () => {

  context("load suggestions", () => {
    beforeEach(() => {
      cy.login()
      cy.visit(`/suggestions`)
    })

    it("should have suggestions", () => {
      cy.data("suggestions-list").children().should("exist")
    })

  })

  context("while loading suggestions", () => {
    beforeEach(() => {
      cy.login()
    })

    it("should spin on no calls being executed", () => {
      cy.intercept({
        method: "GET",
        pathname: "https://firestore.googleapis.com/**"
      })
      cy.visit(`/suggestions`)
      cy.data("suggestions-spinner").should("be.visible")
    })

  })

  context("select specific suggestion", () => {
    beforeEach(() => {
      cy.login()
      cy.visit("/suggestions")
    })

    it("should contain the right id in the url when clicking a suggestion", () => {
      cy.data("suggestion-card").first()
        .invoke("attr", "href")
        .then(href => {
          const id = href.split("/suggestions/")[1]

          cy.data("suggestion-card").first().click()
          cy.location().should((loc) => expect(loc.href).to.contains(id))
        })

    })

  })

})
