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

    it("should show a toast when failed to disable away mode", () => {
      cy.intercept("/rest/v1/member*", { forceNetworkError: true }).as("interceptedRequest")
      cy.data("button-disable-away-mode").click()

      cy.get(".Toastify")
        .get("#away-mode-error")
        .get(".Toastify__toast-body")
        .should(
          "contain.text",
          "Failed to disable Away Mode. Try logging in again if the problem persists.",
        )
    })

    it("should disable away mode when clicking the disable away mode button", () => {
      cy.intercept("/rest/v1/member?id=eq*", { statusCode: 204 }).as("interceptedRequest")
      cy.data("button-disable-away-mode").click()
      cy.wait("@interceptedRequest")
      cy.get(".Toastify")
        .get("#away-mode-disabled")
        .get(".Toastify__toast-body")
        .should("have.text", "Away Mode disabled. You are now visible in the app.")
      // After this it should redirect to the away mode page, but since this is done in the middleware
      // we can't test it here (we can't change server state from the client)
    })
  })
})
