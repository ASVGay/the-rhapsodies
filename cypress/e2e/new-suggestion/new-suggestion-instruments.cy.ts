import {
  fillSongInformationSuccessfully,
  shouldGoToInstrumentsArea,
  fillInstrumentsSuccessfully,
  addInstrumentItem,
  shouldGoToReviewArea,
  shouldBeFilledState,
  newSuggestionFilledSongInformation,
} from "./helpers/new-suggestion.helper"
import { CyHttpMessages } from "cypress/types/net-stubbing"
import { updateNewSuggestion } from "@/redux/slices/new-suggestion.slice"

const toReviewButton = "to-review-button"
const searchInstrumentInput = "search-instrument-input"
const instrumentSearchList = "instrument-search-list"
const instrumentEditList = "instrument-edit-list"
const deleteButton = "delete-button"
const instrumentSearchCloseButton = "instrument-search-close-button"
const descriptionInput = "description-input"
const progressBarInstruments = "new-suggestion-progress-bar-instruments"

let instrumentResponseCache: CyHttpMessages.BaseMessage

describe("when creating a new suggestion, adding instruments", () => {
  before(() => {
    cy.login()
    cy.visit("/suggestions/new")

    //Intercept and cache the instrument list
    cy.intercept("GET", "/rest/v1/instrument?select=*&order=instrument_name.asc").as(
      "getInstruments"
    )
    cy.wait("@getInstruments").then((intercept) => {
      instrumentResponseCache = intercept.response
    })
  })

  beforeEach(() => {
    cy.login()
    cy.intercept("GET", "/rest/v1/instrument?select=*&order=instrument_name.asc", {
      body: instrumentResponseCache.body,
    })

    cy.visit("/suggestions/new", {
      onBeforeLoad(win: Cypress.AUTWindow) {
        cy.window()
          .its("store")
          .invoke("dispatch", updateNewSuggestion(newSuggestionFilledSongInformation))
      },
    })
    cy.wait(500) // Wait so content can render properly and set up submit events
    cy.data(progressBarInstruments).click()
  })

  it("should error if it can't retrieve instruments", () => {
    //N.Y.I
  })

  it("should prevent the process to proceed further", () => {
    cy.data(toReviewButton).should("be.disabled")
  })

  it("should render the review area on click", () => {
    fillInstrumentsSuccessfully()
    shouldBeFilledState()
    shouldGoToReviewArea()
  })

  it("adding a instrument should allow the process to proceed", () => {
    addInstrumentItem()
    shouldGoToReviewArea()
  })

  context("the search bar", () => {
    it("should add an item to the edit list", () => {
      addInstrumentItem()
      cy.data(instrumentEditList).first().should("exist")
    })

    it("allow search to be cleared by pressing the clear button", () => {
      cy.data(searchInstrumentInput).type("a")
      cy.data(instrumentSearchCloseButton).click()
      cy.data(instrumentSearchList).should("not.exist")
    })
  })

  context("an item in the edit list", () => {
    beforeEach(() => {
      addInstrumentItem()
    })

    it("should be removed when pressing the delete button", () => {
      cy.data(instrumentEditList).first().data(deleteButton).click()
      cy.data(instrumentEditList).should("be.empty")
    })
  })

  context("when proceeding to next step, but return to make changes", () => {
    beforeEach(() => {
      addInstrumentItem()
    })

    it("should populate the list with previously added elements", () => {
      cy.data(instrumentEditList).first().should("exist")
    })

    it("should have a clear search bar", () => {
      cy.data(searchInstrumentInput).should("be.empty")
    })

    it("should not show any search results", () => {
      cy.data(instrumentSearchList).should("not.exist")
    })
  })

  context("when proceeding to next step", () => {
    beforeEach(() => {
      addInstrumentItem()
      cy.wait(500)
    })

    it("should add instruments to redux's newSuggestion's suggestion", () => {
      cy.data(instrumentEditList).first().should("exist")
      cy.window()
        .its("store")
        .invoke("getState")
        .its("newSuggestion")
        .its("suggestion")
        .its("instruments")
        .should("have.length", 1)
    })

    it("should reflect the correct description on the instrument in redux", () => {
      cy.data(instrumentEditList).first().data(descriptionInput).type("test description")
      cy.window()
        .its("store")
        .invoke("getState")
        .its("newSuggestion.suggestion.instruments[0].description")
        .should("equal", "test description")
    })
  })
})
