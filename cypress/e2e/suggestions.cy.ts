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

  context("select specific suggestion", () => {
    beforeEach(() => {
      cy.login()
      cy.visit("/suggestions")
    })

    it("should contain the right id in the url when clicking a suggestion", () => {
      const t = cy.data("suggestion-card").first()
      t.invoke("attr", "href")
        .then(href => {
          const id = href.split("/suggestions/")[1]
          cy.data("suggestion-card").first().click()
          cy.location().should((loc) => expect(loc.href).to.contains(id))
        })
    })

  })

})
