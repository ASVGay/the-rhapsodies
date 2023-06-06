import {testSearchSongs} from "./helpers/search-songs.helpers";

describe("repertoire page page", () => {
    const songArtist = "Nirvana"
    const songTitle = "Nobody"
    const songNotFoundText = "It looks like the song you are looking for has not been added yet. Feel free to add the song!"

    beforeEach(() => {
        cy.intercept('GET', '/rest/v1/song*', { fixture: "mock-repertoire-songs.json"}).as('mockedRequest');
        cy.login()
        cy.visit("repertoire")
        cy.wait('@mockedRequest');
        cy.wait(1000)
    })
    context("when searching the repertoire", () => {
        beforeEach(() => {
            cy.data("button-search-suggestions").click()
        })

        testSearchSongs(songArtist, songTitle, songNotFoundText);
    })

    it("Should contain exclamation mark for songs with incomplete divisions", () => {
       cy.data("exclamation-circle").its("length").should("equal", 1)
    })

})