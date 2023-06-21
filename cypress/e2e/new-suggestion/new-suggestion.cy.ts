import { Area } from "@/constants/area"
import {
  shouldBeEmptyState,
  fillSongInformationSuccessfully,
  areaInStateShouldBe,
  shouldContainJSONSongInformationInState,
  fillInstrumentsSuccessfully,
} from "./helpers/new-suggestion.helper"

const path = "/suggestions/new"
const buttonDiscardNewSuggestion = "button-discard-new-suggestion"
const areaSongInformation = "area-song-information"
const areaInstruments = "area-instruments"
const areaReview = "area-review"
const progressBarInstruments = "new-suggestion-progress-bar-instruments"
const progressBarReview = "new-suggestion-progress-bar-review"
const progressBar = "progress-bar"
const inputArtist = "input-artist"
const instrumentEditList = "instrument-edit-list"
const clearSuggestion = "suggestion-clear-icon"

const instrumentsAndReviewArea = [
  {
    area: Area.Instruments,
    progressBarItem: progressBarInstruments,
  },
  {
    area: Area.Review,
    progressBarItem: progressBarReview,
  },
]

describe("when creating a new suggestion", () => {
  describe("when loading instruments fails", () => {
    beforeEach(() => {
      cy.login()
      cy.intercept("GET", "/rest/v1/instrument?select=*&order=instrument_name.asc", {
        forceNetworkError: true,
      })
      cy.visit(path)
      // Wait so content can render properly and set up submit events
      cy.wait(500)
    })

    it("should error if it can't retrieve instruments", () => {
      cy.data("failed-fetching-instruments").should("be.visible")
    })
  })

  describe("when loading instruments succeeds", () => {
    beforeEach(() => {
      cy.login()
      cy.visit(path)
      // Wait so content can render properly and set up submit events
      cy.wait(500)
    })

    context("on page load", () => {
      it("should go to suggestions on discard", () => {
        cy.data(buttonDiscardNewSuggestion).click()
        cy.location("pathname").should("eq", "/suggestions")
      })

      it("should have empty state on load", () => {
        shouldBeEmptyState()
      })
    })

    context("with no song information", () => {
      context("the progress bar", () => {
        instrumentsAndReviewArea.forEach(({ area, progressBarItem }) => {
          context(`when attempting to go to ${area} area`, () => {
            it("should show toast", () => {
              cy.data(progressBarItem).click()
              cy.get(".Toastify")
                .get("#1")
                .get(".Toastify__toast-body")
                .should(
                  "have.text",
                  "You need to fill in all the required fields before continuing"
                )
            })

            it("should stay on the song information", () => {
              cy.data(progressBarItem).click()
              cy.data(areaSongInformation).should("be.visible")
              cy.data(areaInstruments).should("not.exist")
              cy.data(areaReview).should("not.exist")
            })
          })

          it("should show errors on form", () => {
            cy.get(".error-message").should("not.exist")
            cy.data(progressBarItem).click()
            cy.get(".error-message").should("have.length", 3)
          })
        })
      })
    })
    context("with song information", () => {
      it("should render the same active area with state content on change of page", () => {
        fillSongInformationSuccessfully()
        cy.data(progressBarInstruments).click()
        areaInStateShouldBe(Area.Instruments)
        shouldContainJSONSongInformationInState()
        cy.data(buttonDiscardNewSuggestion).click()
        cy.data("button-new-suggestion").click()
        cy.data(areaInstruments).should("be.visible")
        areaInStateShouldBe(Area.Instruments)
        cy.data(areaSongInformation).should("not.exist")
        cy.data(areaReview).should("not.exist")
        cy.data(progressBar).invoke("data", "active-area").should("equal", Area.Instruments)
        shouldContainJSONSongInformationInState()
      })
    })

    context("with song information and instruments", () => {
      it("should clear changes when pressing the clear button", () => {
        // execute user flow to fill the song information and instruments
        fillSongInformationSuccessfully()
        cy.data(progressBarInstruments).click()
        fillInstrumentsSuccessfully()
        // clear suggestion changes
        cy.data(clearSuggestion).click()
        areaInStateShouldBe(Area.SongInformation)
        cy.data(areaSongInformation).should("be.visible")
        cy.data(inputArtist).invoke("val").should("be.empty")
        // fill in song information again to check the instruments state
        fillSongInformationSuccessfully()
        cy.data(progressBarInstruments).click()
        cy.data(instrumentEditList).should("be.empty")
      })
    })
  })
})
