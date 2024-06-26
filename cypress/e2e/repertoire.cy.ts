import { testSearchSongs } from "./helpers/search-songs.helpers"
import { interceptIndefinitely } from "./helpers/interception.helper"

describe("repertoire page page", () => {
  const songArtist = "Nirvana"
  const songTitle = "Nobody"
  const songNotFoundText = "This song is currently not in the repertoire."

  context("when fetching", () => {
    beforeEach(() => {
      cy.login()
      cy.visit("repertoire")
    })

    it("should display spinner when suggestions are fetched", () => {
      const interception = interceptIndefinitely("/rest/v1/song*")
      cy.data("song-list-spinner").should("exist")
      interception.sendResponse()
      cy.data("song-list-spinner").should("not.exist")
    })
  })

  context("when displaying content", () => {
    beforeEach(() => {
      cy.intercept("GET", "/rest/v1/song*", { fixture: "mock-repertoire-songs.json" }).as(
        "mockedRequest",
      )
      cy.login()
      cy.visit("repertoire")
      cy.wait("@mockedRequest")
      cy.wait(1000)
    })
    context("when searching the repertoire", () => {
      beforeEach(() => {
        cy.data("button-search-suggestions").click()
      })

      testSearchSongs(songArtist, songTitle, songNotFoundText)
    })

    it("Should contain red fraction text for songs with incomplete divisions", () => {
      cy.data("progression-fraction").each(($el) => {
        const text = $el.text()
        const [numerator, denominator] = text.split("/").map(Number)
        if (numerator !== denominator) {
          cy.wrap($el).should("have.class", "text-red-400")
        }
      })
    })
  })
})
