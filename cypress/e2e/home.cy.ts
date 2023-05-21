describe("Home Page", () => {
  context("Auth redirect situations", () => {
    it("should redirect to sign in if logged out", () => {
      cy.logout()
      cy.visit("/")
      cy.location("pathname").should("equal", "/sign-in")
    })

    it("should stay on the home page if logged in", () => {
      cy.login()
      cy.visit("/")
      cy.location("pathname").should("equal", "/")
    })

    it("should go to /change-password if logged in as new", () => {
      cy.login(true)
      cy.visit("/")
      cy.location("pathname").should("equal", "/change-password")
    })
  })
})
