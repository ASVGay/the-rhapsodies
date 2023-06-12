const songId = Cypress.env("CYPRESS_SONG_ID")
const usernameOld = Cypress.env("CYPRESS_USERNAME_OLD")

describe("song detail page", () => {
  context("song exists", () => {
    beforeEach(() => {
      cy.login()
      cy.visit(`/repertoire/${songId}`)
    })

    it("should contain a song", () => {
      cy.data("song").should("exist")
    })

    it("should add or remove username from division", () => {
      cy.data("division")
        .first()
        .then((division) => {
          const criteria = division.text().includes(usernameOld)
          cy.intercept("GET", "/rest/v1/song*").as("updateSuggestion")
          cy.data("instrument")
            .first()
            .click()
            .wait("@updateSuggestion")

          criteria && division.text().replace(usernameOld, "").length > 0
            ? cy.data("division").first().should(`not.contain.text`, usernameOld)
            : cy.data("division").first().should(`contain.text`, usernameOld)
        })
    })

    it("should redirect to repertoire on pressing the exit button", () => {
      cy.data("song-x-icon").click()
        .then(() => {
          cy.location("pathname")
            .should("equal", "/repertoire")
        })
    })

  })

  context("song doesn't exist in repertoire", () => {
    before(() => {
      cy.login()
    })

    it("should redirect to 404 page", () => {
      cy.request({ url: "/repertoire/non-existing-id", failOnStatusCode: false })
        .its("status")
        .should("equal", 404)
    })
  })
})
