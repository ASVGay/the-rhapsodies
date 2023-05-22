const toInstrumentsProgressButton = "new-suggestion-progress-bar-instruments"
const instrumentsArea = "area-instruments"
const toReviewButton = "to-review-button"
const searchInstrumentInput = "search-instrument-input"

const addInstrumentItem = () => {
  cy.data(searchInstrumentInput).type("a")
  cy.data("instrument-search-list").first().click()
}

describe("when creating new instrument suggestions for a suggestion", function () {
  beforeEach(() => {
    cy.login()
    cy.visit("/suggestions/new")
    cy.data(toInstrumentsProgressButton).click()
  })

  context("having no instruments added", () => {
    it("should prevent the process to proceed further", function () {
      cy.data(toReviewButton).should("be.disabled")
    })
  })

  context("having instruments added", () => {
    beforeEach(() => {
      addInstrumentItem()
    })

    it("should allow the process to proceed", function () {
      cy.data(toReviewButton).click()
      cy.data(instrumentsArea).should("not.exist")
    })
  })

  context("the search bar", () => {
    beforeEach(() => {
      addInstrumentItem()
    })

    it("should add an item to the edit list", function () {
      cy.data("instrument-edit-list").first().should("exist")
    })
  })

  context("an item in the edit list", () => {
    beforeEach(() => {
      addInstrumentItem()
    })

    it("should be removed when pressing the delete button", function () {
      cy.data("instrument-edit-list").first().data("delete-button").click()
      cy.data("instrument-edit-list").should("be.empty")
    })
  })
})
