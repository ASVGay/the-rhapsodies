const songId = Cypress.env("CYPRESS_SONG_ID")
const usernameAdmin = Cypress.env("CYPRESS_ADMIN_DISPLAY_NAME")

describe("song detail page", () => {
  context("song exists", () => {
    beforeEach(() => {
      cy.intercept("GET", "/_next/**/**/**.json").as("manifest")
      cy.login()
      cy.visit(`/repertoire/${songId}`)
      cy.wait("@manifest")
    })

    it("should contain a song", () => {
      cy.data("song").should("exist")
    })

    it("should add or remove username from division", () => {
      cy.data("division")
        .first()
        .then((division) => {
          const criteria = division.text().includes(usernameAdmin)
          cy.intercept("/rest/v1/song*").as("updateSuggestion")
          // Click on the first instrument
          cy.data("instrument-0").clickWhenClickable()
          cy.wait("@updateSuggestion")

          criteria && division.text().replace(usernameAdmin, "").length > 0
            ? cy.data("division").first().should(`not.contain.text`, usernameAdmin)
            : cy.data("division").first().should(`contain.text`, usernameAdmin)
        })
    })

    it("should redirect to repertoire on pressing the exit button", () => {
      cy.data("song-x-icon")
        .click()
        .then(() => {
          cy.location("pathname").should("equal", "/repertoire")
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
