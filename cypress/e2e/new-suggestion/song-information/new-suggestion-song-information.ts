import { NewSuggestion } from "@/interfaces/new-suggestion"
import { newSuggestionEmpty } from "../new-suggestion"

const inputTitle = "input-title"
const inputArtist = "input-artist"
const inputLink = "input-link"
const inputMotivation = "input-motivation"

export const fillSongInformationSuccessfully = () => {
  cy.data(inputTitle).type(newSuggestionFilledSongInformation.title)
  cy.data(inputArtist).type(newSuggestionFilledSongInformation.artist[0])
  cy.data(inputLink).type(newSuggestionFilledSongInformation.link)
  cy.data(inputMotivation).type(newSuggestionFilledSongInformation.motivation)
}

export const newSuggestionFilledSongInformation: NewSuggestion = {
  artist: ["The Beatles"],
  link: "www.hello.com",
  motivation:
    "We have already sung it once while just playing randomly and it was pretty fun so thought it would be nice to add it to the repertoire.",
  title: "Let It Be",
  instruments: [],
}

export const shouldBeEmptyInformationState = () => {
  cy.window()
    .its("store")
    .invoke("getState")
    .its("newSuggestion")
    .its("suggestion")
    .its("title")
    .should("deep.equal", newSuggestionEmpty.title)

  cy.window()
    .its("store")
    .invoke("getState")
    .its("newSuggestion")
    .its("suggestion")
    .its("artist")
    .should("deep.equal", newSuggestionEmpty.artist)

  cy.window()
    .its("store")
    .invoke("getState")
    .its("newSuggestion")
    .its("suggestion")
    .its("link")
    .should("be.null")

  cy.window()
    .its("store")
    .invoke("getState")
    .its("newSuggestion")
    .its("suggestion")
    .its("motivation")
    .should("deep.equal", newSuggestionEmpty.motivation)
}

export const shouldContainJSONSongInformationInState = () => {
  cy.window()
    .its("store")
    .invoke("getState")
    .its("newSuggestion")
    .its("suggestion")
    .its("title")
    .should("deep.equal", newSuggestionFilledSongInformation.title)

  cy.window()
    .its("store")
    .invoke("getState")
    .its("newSuggestion")
    .its("suggestion")
    .its("artist")
    .should("deep.equal", newSuggestionFilledSongInformation.artist)

  cy.window()
    .its("store")
    .invoke("getState")
    .its("newSuggestion")
    .its("suggestion")
    .its("link")
    .should("deep.equal", newSuggestionFilledSongInformation.link)

  cy.window()
    .its("store")
    .invoke("getState")
    .its("newSuggestion")
    .its("suggestion")
    .its("motivation")
    .should("deep.equal", newSuggestionFilledSongInformation.motivation)
}
