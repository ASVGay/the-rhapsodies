import { Area } from "@/constants/area"
import { ISuggestionInstrument, ISuggestion } from "@/interfaces/suggestion"

const buttonAddInstruments = "button-add-instruments"
const areaSongInformation = "area-song-information"
const areaInstruments = "area-instruments"
const areaReview = "area-review"
const progressBar = "progress-bar"
const searchInstrumentInput = "search-instrument-input"
const instrumentSearchList = "instrument-search-list"
const inputTitle = "input-title"
const inputArtist = "input-artist"
const inputLink = "input-link"
const inputMotivation = "input-motivation"
const instrumentsArea = "area-instruments"
const toReviewButton = "to-review-button"

export const newSuggestionEmpty: ISuggestion = {
  artist: [],
  link: null,
  motivation: "",
  title: "",
  instruments: []
}

export const filledInInstrument: ISuggestionInstrument = {
  description: "",
  instrument: {
    id: "f5ccaa5d-c601-40fb-8604-5fc7485f8528",
    image_source: "guitar",
    instrument_name: "Acoustic Guitar"
  }
}

export const newSuggestionFilledSongInformation: ISuggestion = {
  artist: ["The Beatles"],
  link: "www.hello.com",
  motivation:
    "We have already sung it once while just playing randomly and it was pretty fun so thought it would be nice to add it to the repertoire.",
  title: "Let It Be",
  instruments: []
}

export const newSuggestionFilledInInstruments: ISuggestion = {
  artist: ["The Beatles"],
  link: "www.hello.com",
  motivation:
    "We have already sung it once while just playing randomly and it was pretty fun so thought it would be nice to add it to the repertoire.",
  title: "Let It Be",
  instruments: [filledInInstrument]
}

export const shouldGoToInstrumentsArea = () => {
  cy.data(buttonAddInstruments).click()
  cy.data(areaInstruments).should("be.visible")
  cy.data(areaSongInformation).should("not.exist")
  cy.data(areaReview).should("not.exist")
  cy.data(progressBar).invoke("data", "active-area").should("equal", Area.Instruments)
  areaInStateShouldBe(Area.Instruments)
}

export const fillInstrumentsSuccessfully = () => {
  addInstrumentItem()
}

export const shouldBeEmptyInstrumentsState = () => {
  cy.window()
    .its("store")
    .invoke("getState")
    .its("newSuggestion")
    .its("suggestion")
    .its("artist")
    .should("deep.equal", [])
}

export const shouldContainJSONInstrumentInState = () => {
  cy.window()
    .its("store")
    .invoke("getState")
    .its("newSuggestion")
    .its("suggestion")
    .its("instruments")
    .should("deep.equal", [filledInInstrument])
}

export const addInstrumentItem = () => {
  cy.data(searchInstrumentInput).type(filledInInstrument.instrument.instrument_name)
  cy.data(instrumentSearchList).first().click()
}

export const shouldGoToReviewArea = () => {
  cy.data(toReviewButton).click()
  cy.data(instrumentsArea).should("not.exist")
  cy.data(areaSongInformation).should("not.exist")
}

export const fillSongInformationSuccessfully = () => {
  cy.data("area-song-information").then($component => {
    if ($component.find("input-artist").length == 0) {
      cy.data("manual-input-btn").click()
    }
  }).then(() => {
    cy.data(inputTitle).type(newSuggestionFilledSongInformation.title)
    cy.data(inputArtist).type(newSuggestionFilledSongInformation.artist[0])
    cy.data(inputLink).type(newSuggestionFilledSongInformation.link)
    cy.data(inputMotivation).type(newSuggestionFilledSongInformation.motivation)
  })
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

export const shouldBeEmptyState = () => {
  shouldBeEmptyInformationState()
  shouldBeEmptyInstrumentsState()
}

export const shouldBeFilledState = () => {
  shouldContainJSONSongInformationInState()
  shouldContainJSONInstrumentInState()
}

export const areaInStateShouldBe = (area: Area) => {
  cy.window()
    .its("store")
    .invoke("getState")
    .its("newSuggestion")
    .its("activeArea")
    .should("equal", area)
}
