describe("on the settings page", () => {
  beforeEach(() => {
    cy.login()
    cy.visit("/settings")
  })

  it("should go to the toggle away mode page when the button is clicked", () => {
    cy.data("away-mode-button").click()
    cy.location("pathname").should("eq", "/settings/away-mode")
  })
})
