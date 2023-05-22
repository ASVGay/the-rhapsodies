const toInstrumentsProgressButton = "new-suggestion-progress-bar-instruments"
const instrumentsArea = "area-instruments"
const toReviewButton = "to-review-button"
const searchInstrumentInput = "search-instrument-input"

const instrumentSearchList = "instrument-search-list"
const instrumentEditList = "instrument-edit-list"
const deleteButton = "delete-button"
const instrumentSearchCloseButton = "instrument-search-close-button"
const descriptionInput = "description-input"
const inputTitle = "input-title"
const inputArtist = "input-artist"
const inputLink = "input-link"
const inputMotivation = "input-motivation"

const addInstrumentItem = () => {
  cy.data(searchInstrumentInput).type("a")
  cy.data(instrumentSearchList).first().click()
}

describe("when creating new instrument suggestions for a suggestion", function () {
  beforeEach(() => {
    cy.login()
    cy.visit("/suggestions/new")
    // Wait so content can render properly and set up submit events
    cy.wait(500)
    cy.data(inputTitle).type("Hello")
    cy.data(inputArtist).type("Hello")
    cy.data(inputLink).type("www.hello.com")
    cy.data(inputMotivation).type("Hello")
    cy.data(toInstrumentsProgressButton).click()
  })

  it("should error if it can't retrieve instruments", function () {
    //TODO: Add test
  })

  it("should prevent the process to proceed further", function () {
    cy.data(toReviewButton).should("be.disabled")
  })

  it("adding a instrument should allow the process to proceed", function () {
    addInstrumentItem()
    cy.data(toReviewButton).click()
    cy.data(instrumentsArea).should("not.exist")
  })

  context("the search bar", () => {
    it("should add an item to the edit list", function () {
      addInstrumentItem()
      cy.data(instrumentEditList).first().should("exist")
    })

    it("allow search to be cleared by pressing the clear button", function () {
      cy.data(searchInstrumentInput).type("a")
      cy.data(instrumentSearchCloseButton).click()
      cy.data(instrumentSearchList).should("not.exist")
    })
  })

  context("an item in the edit list", () => {
    beforeEach(() => {
      addInstrumentItem()
    })

    it("should be removed when pressing the delete button", function () {
      cy.data(instrumentEditList).first().data(deleteButton).click()
      cy.data(instrumentEditList).should("be.empty")
    })
  })

  context("when proceeding to next step, but return to make changes", () => {
    beforeEach(() => {
      addInstrumentItem()
      cy.data(toReviewButton).click()
      cy.data(toInstrumentsProgressButton).click()
    })

    it("should populate the list with previously added elements", function () {
      cy.data(instrumentEditList).first().should("exist")
    })

    it("should have a clear search bar", function () {
      cy.data(searchInstrumentInput).should("be.empty")
    })

    it("should not show any search results", function () {
      cy.data(instrumentSearchList).should("not.exist")
    })
  })

  context("when proceeding to next step", () => {
    beforeEach(() => {
      addInstrumentItem()
      cy.wait(500)
    })

    it("should add instruments to redux's newSuggestion's suggestion", function () {
      cy.data(instrumentEditList).first().should("exist")
      cy.window()
        .its("store")
        .invoke("getState")
        .its("newSuggestion")
        .its("suggestion")
        .its("instruments")
        .should("have.length", 1)
    })

    it("should reflect the correct description on the instrument in redux", function () {
      cy.data(instrumentEditList).first().data(descriptionInput).type("test description")
      cy.window()
        .its("store")
        .invoke("getState")
        .its("newSuggestion.suggestion.instruments[0].description")
        .should("equal", "test description")
    })
  })
})
