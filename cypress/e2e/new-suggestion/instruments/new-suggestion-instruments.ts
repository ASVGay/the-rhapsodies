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

export const addInstrumentItem = () => {
  cy.data(searchInstrumentInput).type("a")
  cy.data(instrumentSearchList).first().click()
}
