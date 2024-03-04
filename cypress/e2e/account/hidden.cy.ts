import { User } from "../../support/user.enum"

describe("A hidden user", () => {
  const path = "/away-mode-enabled"
  const logoutBtn = "logout-btn"
  const displayName = "display-name"

  describe("when navigating", () => {
    it("should go to the away mode enabled page if going to the away mode enabled page", () => {
      cy.login(User.HIDDEN)
      cy.visit(path)
      cy.location("pathname").should("equal", path)
    })

    it("should go to the away mode enabled page if going to the home page", () => {
      cy.login(User.HIDDEN)
      cy.visit("/")
      cy.location("pathname").should("equal", path)
    })
  })

  describe("on the away mode enabled page", () => {
    beforeEach(() => {
      cy.login(User.HIDDEN)
      cy.visit(path)
    })

    it("should go to the away mode enabled page", () => {
      cy.location("pathname").should("equal", path)
    })

    it("should not show the navigation", () => {
      cy.data("top").should("not.exist")
      cy.data("bottom").should("not.exist")
    })

    it("should show the name and buttons", () => {
      cy.data(displayName).contains("Hidden")
      cy.data("button-disable-away-mode").should("exist")
      cy.data(logoutBtn).should("exist")
    })

    it("should log out when clicking the sign out button", () => {
      cy.data(logoutBtn).click()
      cy.location("pathname").should("equal", "/sign-in")
    })

    it("should show a toast when failed to retrieve display name", () => {
      cy.intercept("/rest/v1/member*", { forceNetworkError: true }).as("interceptedRequest")
      cy.visit(path)

      cy.get(".Toastify")
        .get("#name-error")
        .get(".Toastify__toast-body")
        .should("have.text", "Something went wrong while retrieving your account data.")
      cy.data(displayName).should("not.exist")
    })
  })
})
