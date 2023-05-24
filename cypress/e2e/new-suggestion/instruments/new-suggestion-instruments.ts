import { Area } from "@/constants/area"
import { areaInStateShouldBe } from "../new-suggestion"
import { NewSuggestionInstrument } from "@/interfaces/new-suggestion"

const buttonAddInstruments = "button-add-instruments"
const areaSongInformation = "area-song-information"
const areaInstruments = "area-instruments"
const areaReview = "area-review"
const progressBar = "progress-bar"
const searchInstrumentInput = "search-instrument-input"
const instrumentSearchList = "instrument-search-list"

export const filledInInstrument: NewSuggestionInstrument = {
  description: "",
  instrument: {
    id: "f5ccaa5d-c601-40fb-8604-5fc7485f8528",
    image_source: "guitar",
    instrument_name: "Acoustic Guitar",
  },
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
