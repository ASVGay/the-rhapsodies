import { Area } from "@/constants/area"
import {
  shouldBeEmptyInformationState,
  shouldContainJSONSongInformationInState,
} from "./song-information/new-suggestion-song-information"
import { NewSuggestion } from "@/interfaces/new-suggestion"
import {
  shouldBeEmptyInstrumentsState,
  shouldContainJSONInstrumentInState,
} from "./instruments/new-suggestion-instruments"

export const newSuggestionEmpty: NewSuggestion = {
  artist: [],
  link: null,
  motivation: "",
  title: "",
  instruments: [],
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
