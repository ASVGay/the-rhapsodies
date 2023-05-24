enum Area {
  SongInformation = "song-information",
  Instruments = "instruments",
  Review = "review",
}

const path = "/suggestions/new"
const buttonAddInstruments = "button-add-instruments"
const buttonDiscardNewSuggestion = "button-discard-new-suggestion"
const areaSongInformation = "area-song-information"
const areaInstruments = "area-instruments"
const areaReview = "area-review"
const progressBar = "progress-bar"
const progressBarSongInformation = "new-suggestion-progress-bar-song-information"
const progressBarInstruments = "new-suggestion-progress-bar-instruments"
const progressBarReview = "new-suggestion-progress-bar-review"
const inputTitle = "input-title"
const inputArtist = "input-artist"
const inputLink = "input-link"
const inputMotivation = "input-motivation"

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

const requiredInputs = [
  {
    name: "title",
    inputField: inputTitle,
    error: "input-title-error",
  },
  {
    name: "artist",
    inputField: inputArtist,
    error: "input-artist-error",
  },
  {
    name: "motivation",
    inputField: inputMotivation,
    error: "input-motivation-error",
  },
]

describe("when creating a new suggestion", () => {
  beforeEach(() => {
    cy.login()
  })
  context("on page load", () => {
    beforeEach(() => {
      cy.visit(path)
    })

    it("should go to suggestions on discard", () => {
      cy.data(buttonDiscardNewSuggestion).click()
      cy.location("pathname").should("eq", "/suggestions")
    })

    it("should have empty state on load", () => {
      cy.fixture("state-empty-new-suggestion.json").then((state) => {
        cy.window()
          .its("store")
          .invoke("getState")
          .its("newSuggestion")
          .should("deep.equal", state.newSuggestion)
      })
    })
  })

  context("with no song information", () => {
    beforeEach(() => {
      cy.visit(path)
      // Wait so content can render properly and set up submit events
      cy.wait(500)
    })

    context("the progress bar", () => {
      instrumentsAndReviewArea.forEach(({ area, progressBarItem }) => {
        context(`when attempting to go to ${area} area`, () => {
          it("should show toast", () => {
            cy.data(progressBarItem).click()
            cy.get(".Toastify")
              .get("#1")
              .get(".Toastify__toast-body")
              .should("have.text", "You need to fill in all the required fields before continuing")
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
})
