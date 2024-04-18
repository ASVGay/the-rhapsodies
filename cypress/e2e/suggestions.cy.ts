import { interceptIndefinitely } from "./helpers/interception.helper"
import { testSearchSongs } from "./helpers/search-songs.helpers"

const songArtist = "Nirvana"
const songTitle = "Jessie's Girl"
const songDescription =
  "Pretty fun song with a nice guitar solo and fun interlude in it. Vocals are not too high and I think it would sound okay with multiple vocalists as well. All instruments (expect for the lead guitar) are fairly easy as well."
const songNotFoundText =
  "It looks like the song you are looking for has not been added yet. Feel free to add the song!"
describe("suggestions page", () => {
  context("load suggestions", () => {
    beforeEach(() => {
      cy.login()
      cy.visit("/suggestions")
    })

    it("should go to new suggestion on click of new suggestion", () => {
      cy.data("button-new-suggestion").click()
      cy.location("pathname").should("eq", "/suggestions/new")
    })

    it("should have suggestions", () => {
      cy.data("suggestions-list").children().should("exist")
    })

    it("should display spinner when suggestions are fetched", () => {
      const interception = interceptIndefinitely("GET", "/rest/v1/song*")
      cy.data("song-list-spinner").should("exist")
      interception.sendResponse()
      cy.data("song-list-spinner").should("not.exist")
    })

    it("should contain green fraction text for songs with complete divisions", () => {
      cy.data("progression-fraction").each(($el) => {
        const text = $el.text()
        const [numerator, denominator] = text.split("/").map(Number)
        if (numerator === denominator) {
          cy.wrap($el).should("have.class", "text-green-500")
        }
      })
    })
  })

  context("select specific suggestion", () => {
    beforeEach(() => {
      cy.login()
      cy.visit("/suggestions")
      cy.intercept("GET", "/rest/v1/song*").as("suggestions")
      cy.wait("@suggestions")
    })

    it("should display spinner when going to a specific song", () => {
      cy.data("song-list-spinner").should("not.exist")
      cy.data("suggestion-card").first().should("be.visible").click()
      cy.data("song-list-spinner").should("exist")
    })

    it("should contain the right id in the url when clicking a suggestion", () => {
      cy.data("suggestion-card")
        .first()
        .then(($el) => {
          cy.wrap($el)
            .should("be.visible")
            .invoke("attr", "data-id")
            .then((id) => {
              cy.wrap($el).click()
              cy.location().should((loc) => expect(loc.href).to.contains(id))
            })
        })
    })
  })

  context("suggestions fetching edge cases", () => {
    beforeEach(() => {
      cy.login()
      cy.visit("/suggestions")
    })

    it("should display no suggestions message", () => {
      cy.intercept("/rest/v1/song*", [])
      cy.data("no-suggestions-text").should("be.visible")
    })

    it("should display get suggestions error", () => {
      cy.intercept({ method: "GET", url: "/rest/v1/song*" }, { statusCode: 500 })
      cy.data("failed-fetching-suggestions").should("be.visible")
    })
  })

  context("search suggestions", () => {
    beforeEach(() => {
      cy.intercept("GET", "/rest/v1/song*", { fixture: "mock-suggestions.json" }).as(
        "mockedRequest",
      )
      cy.login()
      cy.visit("suggestions")
      cy.wait("@mockedRequest")
      cy.wait(1000)
      cy.data("button-search-suggestions").click()
    })

    it("Should display correct suggestion when searching by description", () => {
      cy.data("search-suggestion-input").type(songDescription)
      cy.data("suggestions-list").children().should("exist")
      cy.data("suggestions-list")
        .children()
        .should("have.length", 1)
        .and("contain.text", songDescription)
    })

    testSearchSongs(songArtist, songTitle, songNotFoundText)
  })
})
