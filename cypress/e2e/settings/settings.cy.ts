const icons8Link = "https://icons8.com"

const passwordTextfield = "change-password-textfield"
const confirmPasswordTextfield = "confirm-password-textfield"
const submitPasswordBtn = "submit-password-btn"
const shortPassword = "test"
const oldUserPassword = Cypress.env("CYPRESS_OLD_PASSWORD")
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

  it("should go to the change password page", () => {
    cy.data("change-password-button").click()
    cy.location("pathname").should("eq", "/settings/change-password")
  })
})
