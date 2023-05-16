const areaSongInformation = "area-song-information"
const areaInstruments = "area-instruments"
const areaReview = "area-review"
const newSuggestionProgressBarInstruments = "new-suggestion-progress-bar-instruments"
const newSuggestionProgressBarReview = "new-suggestion-progress-bar-review"
const newSuggestionProgressBarSongInformation = "new-suggestion-progress-bar-song-information"

describe("when creating a new suggestion", function () {
  beforeEach(() => {
    cy.login()
    cy.visit("/suggestions/new")
  })

  it("should go to suggestions on discard", function () {
    cy.data("new-suggestion-discard").click()
    cy.location("pathname").should("eq", "/suggestions")
  })

  context("the progress bar", () => {
    it("should render the song information area after visit", () => {
      cy.data(areaSongInformation).should("be.visible")
      cy.data(areaInstruments).should("not.be.visible")
      cy.data(areaReview).should("not.be.visible")
      cy.get(`[data-active-area="song-information"]`).should("exist")
      cy.get(`[data-active-area="review"]`).should("not.exist")
      cy.get(`[data-active-area="instruments"]`).should("not.exist")
    })

    it("should render the instruments area on click", () => {
      cy.data(newSuggestionProgressBarInstruments).click()
      cy.data(areaSongInformation).should("not.be.visible")
      cy.data(areaInstruments).should("be.visible")
      cy.data(areaReview).should("not.be.visible")
      cy.get(`[data-active-area="song-information"]`).should("not.exist")
      cy.get(`[data-active-area="instruments"]`).should("exist")
      cy.get(`[data-active-area="review"]`).should("not.exist")
    })

    it("should render the review area on click", () => {
      cy.data(newSuggestionProgressBarReview).click()
      cy.data(areaSongInformation).should("not.be.visible")
      cy.data(areaInstruments).should("not.be.visible")
      cy.data(areaReview).should("be.visible")
      cy.get(`[data-active-area="song-information"]`).should("not.exist")
      cy.get(`[data-active-area="instruments"]`).should("not.exist")
      cy.get(`[data-active-area="review"]`).should("exist")
    })

    it("should render the song-information area on click", () => {
      // first go to other page to confirm it works as expected
      cy.data(newSuggestionProgressBarReview).click()
      cy.data(newSuggestionProgressBarSongInformation).click()
      cy.data(areaSongInformation).should("be.visible")
      cy.data(areaInstruments).should("not.be.visible")
      cy.data(areaReview).should("not.be.visible")
      cy.get(`[data-active-area="song-information"]`).should("exist")
      cy.get(`[data-active-area="instruments"]`).should("not.exist")
      cy.get(`[data-active-area="review"]`).should("not.exist")
    })
  })
})
