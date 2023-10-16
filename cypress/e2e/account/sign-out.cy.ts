describe("Sign-out", () => {
  beforeEach(() => {
    cy.login()
    cy.visit("/settings")
  })

  it("Should change route to sign in page after signing out", () => {
    cy.data("logout-btn").click()
    cy.location("pathname").should("equal", "/sign-in")
  })

  it("Should show toast when signing out returns error", () => {
    cy.intercept("POST", "/auth/v1/logout*", (req) => {
      req.reply({
        statusCode: 500,
      })
    }).as("interceptedRequest")
    cy.data("logout-btn").click()
    cy.get(".Toastify")
      .get("#1")
      .get(".Toastify__toast-body")
      .should("have.text", "Something went wrong while logging out. Please try again.")
  })
})
