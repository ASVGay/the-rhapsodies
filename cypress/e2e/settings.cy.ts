const icons8Link = "https://icons8.com"
describe("the settings page", () => {
  beforeEach(() => {
    cy.login()
    cy.visit("/settings")
  })

  it("should somewhere contain a link to Icons8", function () {
    cy.get("a[href]").each(($el) => {
      cy.wrap($el.attr("href")).should("include", icons8Link)
    })
  })
})
