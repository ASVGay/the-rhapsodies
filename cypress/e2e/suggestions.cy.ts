const songArtist = "Nirvana"
const songTitle = "Jessie's Girl"
const songDescription = "Pretty fun song with a nice guitar solo and fun interlude in it. Vocals are not too high and I think it would sound okay with multiple vocalists as well. All instruments (expect for the lead guitar) are fairly easy as well."
const songNotFoundText = "Looks like the song you are looking for does not exist yet! Feel free to add the song!"
describe("suggestions page", () => {
  beforeEach(() => {
    cy.login()

    cy.visit("/suggestions")

  })

  context("load suggestions", () => {
    it("should have suggestions", () => {
      cy.data("suggestions-list").children().should("exist")
    })
  })

  context("select specific suggestion", () => {
    it("should contain the right id in the url when clicking a suggestion", () => {
      cy.data("suggestion-card").first()
        .invoke("attr", "href")
        .then(href => {
          const id = href.split("/suggestions/")[1]
          cy.data("suggestion-card").first().click()
          cy.location().should((loc) => expect(loc.href).to.contains(id))
        })
    })
  })

  context("suggestions fetching edge cases", () => {
    it("should display no suggestions message", () => {
      cy.intercept("/rest/v1/suggestion*", [])
      cy.data("no-suggestions-text").should("be.visible")
    })

    it("should display get suggestions error", () => {
      cy.intercept({ method: "GET", url: "/rest/v1/suggestion*" }, { forceNetworkError: true })
      cy.data("failed-fetching-suggestions").should("be.visible")
    })
  })

  context("spinner", () => {
    it("should display spinner when suggestions are still being retrieved", () => {
      cy.intercept('GET', "/rest/v1/suggestion*").as('getSuggestions')
      cy.wait('@getSuggestions')
      cy.data("suggestions-spinner").should("exist")
    })

    it("shouldn't display spinner after suggestion have been retrieved", () => {
      cy.intercept('GET', "/rest/v1/suggestion*").as('getSuggestions')
      cy.wait('@getSuggestions').then(() => {
        cy.data("suggestions-spinner").should("not.exist")
      })
    })
  })

  context("search suggestions", () => {
    beforeEach(() => {
      cy.intercept('GET', '/rest/v1/suggestion*', { fixture: "mock-suggestions.json"}).as('mockedRequest');
      cy.login()
      cy.visit("suggestions")
      cy.wait('@mockedRequest');
    })

    it("Should display correct suggestion when searching by name", () => {
      cy.data("button-search-suggestions").click()
      cy.data("search-suggestion-input").type(songArtist)
      cy.data("suggestions-list").children().should("exist")
      cy.data("suggestions-list")
          .children()
          .should("have.length", 1)
          .contains( songArtist);
    })


    it("Should display correct suggestion when searching by description", () => {
      cy.data("button-search-suggestions").click()
      cy.data("search-suggestion-input").type(songDescription)
      cy.data("suggestions-list").children().should("exist")
      cy.data("suggestions-list")
          .children()
          .should("have.length", 1)
          .contains(songDescription);
    })

    it("Should display correct suggestion when searching by title", () => {
      cy.data("button-search-suggestions").click()
      cy.data("search-suggestion-input").type(songTitle)
      cy.data("suggestions-list").children().should("exist")
      cy.data("suggestions-list")
          .children()
          .should("have.length", 1)
          .contains(songTitle);
    })

    it("Should display correct error message when no songs are found", () => {
      cy.data("button-search-suggestions").click()
      cy.data("search-suggestion-input").type("There will not be a song with a name, title, or description like this")
      cy.data("suggestions-list").children().should("not.exist")
      cy.data("no-suggestions-text").contains(songNotFoundText)
    })

  })


})
