describe("the forgot password page", () => {
  beforeEach(() => {
    cy.visit("/forgot-password")
  })

  it("should go to homepage if logged in", () => {
    cy.login()
  })

  it("should go back to login on click", () => {
    cy.data("back-to-sign-in").click()
    cy.location("pathname").should("equal", "/sign-in")
  })

  it("should require a valid email before submit", () => {
    cy.get("input:invalid").should("have.length", 1)
    // check if still invalid with invalid email
    cy.data("input-email").type("test")
    cy.get("input:invalid").should("have.length", 1)
    // check if valid with valid email
    cy.data("input-email").type("@test.com")
    cy.get("input:invalid").should("have.length", 0)
  })
})
