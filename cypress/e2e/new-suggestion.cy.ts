enum Area {
  SongInformation = "song-information",
  Instruments = "instruments",
  Review = "review",
}

const buttonDiscardNewSuggestion = "button-discard-new-suggestion"
const areaSongInformation = "area-song-information"
const areaInstruments = "area-instruments"
const areaReview = "area-review"
const progressBar = "progress-bar"
const newSuggestionProgressBarInstruments = "new-suggestion-progress-bar-instruments"
const newSuggestionProgressBarReview = "new-suggestion-progress-bar-review"
const newSuggestionProgressBarSongInformation = "new-suggestion-progress-bar-song-information"

describe("when creating a new suggestion", function () {
  beforeEach(() => {
    cy.login()
    cy.visit("/suggestions/new")
  })

  it("should go to suggestions on discard", function () {
    cy.data(buttonDiscardNewSuggestion).click()
    cy.location("pathname").should("eq", "/suggestions")
  })

  context("the progress bar", () => {
    it("should render the song-information area on click", () => {
      cy.data(newSuggestionProgressBarSongInformation).click()
      cy.data(areaSongInformation).should("be.visible")
      cy.data(areaInstruments).should("not.exist")
      cy.data(areaReview).should("not.exist")
      cy.data(progressBar).invoke("data", "active-area").should("equal", Area.SongInformation)
    })

    context("with filled in song information", () => {
      it.only("should render the instruments area on click", () => {
        cy.data(newSuggestionProgressBarInstruments).click()
        cy.data(areaInstruments).should("be.visible")
        cy.data(areaSongInformation).should("not.exist")
        cy.data(areaReview).should("not.exist")
        cy.data(progressBar).invoke("data", "active-area").should("equal", Area.Instruments)
      })

      it("should render the review area on click", () => {
        cy.data(newSuggestionProgressBarReview).click()
        cy.data(areaReview).should("be.visible")
        cy.data(areaSongInformation).should("not.exist")
        cy.data(areaInstruments).should("not.exist")
        cy.data(progressBar).invoke("data", "active-area").should("equal", Area.Review)
      })

      it("should render the same active area on change of page", function () {
        // todo update state
        cy.data(newSuggestionProgressBarReview).click()
        cy.data(buttonDiscardNewSuggestion).click()
        cy.data("button-new-suggestion").click()
        cy.data(areaReview).should("be.visible")
        cy.data(areaSongInformation).should("not.exist")
        cy.data(areaInstruments).should("not.exist")
        cy.data(progressBar).invoke("data", "active-area").should("equal", Area.Review)
      })
    })

    context("with no song information", () => {
      context("when attempting to go to instruments area", () => {
        it("should show toast", function () {})

        it("should stay on the song information", function () {})
      })

      context("when attempting to go to review area", () => {
        it("should show toast", function () {})

        it("should stay on the song information", function () {})
      })
    })
  })

  context("in the song information area", function () {
    it("should fill in nothing when empty state", function () {})
    it("should fill in default values when filled in state", function () {})
    it("should show error if no title", function () {})
    it("should show error if no artist", function () {})
    it("should show error if no motivation", function () {})
    it("should show go to instruments area if filled in required fields", function () {})
  })
})
