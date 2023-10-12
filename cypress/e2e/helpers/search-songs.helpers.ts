export const testSearchSongs = (
  songArtist: string,
  songTitle: string,
  songNotFoundText: string,
) => {
  it("Should display correct suggestion when searching by name", () => {
    cy.data("search-suggestion-input").type(songArtist)
    cy.data("suggestions-list").children().should("exist")
    cy.data("suggestions-list").children().should("have.length", 1).and("contain.text", songArtist)
  })

  it("Should display correct suggestion when searching by title", () => {
    cy.data("search-suggestion-input").type(songTitle)
    cy.data("suggestions-list").children().should("exist")
    cy.data("suggestions-list").children().should("have.length", 1).and("contain.text", songTitle)
  })

  it("Should display correct error message when no songs are found", () => {
    cy.data("search-suggestion-input").type(
      "There will not be a song with a name, title, or description like this",
    )
    cy.data("suggestions-list").children().should("not.exist")
    cy.data("no-suggestions-text").contains(songNotFoundText)
  })
}
