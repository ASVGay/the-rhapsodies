import {testSearchSongs} from "./helpers/search-songs.helpers";

const songArtist = "Nirvana"
const songTitle = "Jessie's Girl"
const songDescription = "Pretty fun song with a nice guitar solo and fun interlude in it. Vocals are not too high and I think it would sound okay with multiple vocalists as well. All instruments (expect for the lead guitar) are fairly easy as well."
const songNotFoundText = "It looks like the song you are looking for has not been added yet. Feel free to add the song!"
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
  })

  context("select specific suggestion", () => {
    beforeEach(() => {
      cy.login()
      cy.visit("/suggestions")
    })

    it("should contain the right id in the url when clicking a suggestion", () => {
      cy.data("suggestion-card")
        .first()
        .invoke("attr", "href")
        .then((href) => {
          const id = href.split("/suggestions/")[1]
          cy.data("suggestion-card").first().click()
          cy.location().should((loc) => expect(loc.href).to.contains(id))
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
      cy.intercept({ method: "GET", url: "/rest/v1/song*" }, { forceNetworkError: true })
      cy.data("failed-fetching-suggestions").should("be.visible")
    })
  })

  context("search suggestions", () => {
    beforeEach(() => {
      cy.intercept('GET', '/rest/v1/song*', { fixture: "mock-suggestions.json"}).as('mockedRequest');
      cy.login()
      cy.visit("suggestions")
      cy.wait('@mockedRequest');
      cy.wait(1000)
      cy.data("button-search-suggestions").click()
    })

    it("Should display correct suggestion when searching by description", () => {
      cy.data("search-suggestion-input").type(songDescription)
      cy.data("suggestions-list").children().should("exist")
      cy.data("suggestions-list")
          .children()
          .should("have.length", 1)
          .and("contain.text", songDescription);
    })

    testSearchSongs(songArtist, songTitle, songNotFoundText)
  })


  context("spinner", () => {
    beforeEach(() => {
      cy.login()
      cy.visit("/suggestions")
    })

    it("should display spinner when suggestions are still being retrieved", () => {
      cy.intercept("GET", "/rest/v1/song*").as("getSuggestions")
      cy.wait("@getSuggestions")
      cy.data("suggestions-spinner").should("exist")
    })

    it("shouldn't display spinner after suggestion have been retrieved", () => {
      cy.intercept("GET", "/rest/v1/song*").as("getSuggestions")
      cy.wait("@getSuggestions").then(() => {
        cy.data("suggestions-spinner").should("not.exist")
      })
    })
  })
})
