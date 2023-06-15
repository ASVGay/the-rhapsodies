const icons8Link = "https://icons8.com"

describe("the settings page", () => {
  beforeEach(() => {
    cy.login()
    cy.visit("/settings")
  })

  it("should somewhere contain a link to Icons  8", () => {
    cy.get("a[href]").each(($el) => {
      cy.wrap($el.attr("href")).should("include", icons8Link)
    })
  })

  it("should go to the change display name page", () => {
    cy.data("change-display-name-button").click()
    cy.location("pathname").should("eq", "/settings/change-display-name")
  })

  it("should go to the change password page", () => {
    cy.data("change-password-button").click()
    cy.location("pathname").should("eq", "/settings/change-password")
  })

  it("should open the terms and conditions overlay", () => {
    cy.data("terms-conditions-button").click()
    cy.data("terms-and-conditions").should("exist")
  })
})
