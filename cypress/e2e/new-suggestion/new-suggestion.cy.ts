import { Area } from "@/constants/area"
import { shouldBeEmptyState } from "./new-suggestion"

const path = "/suggestions/new"
const buttonDiscardNewSuggestion = "button-discard-new-suggestion"
const areaSongInformation = "area-song-information"
const areaInstruments = "area-instruments"
const areaReview = "area-review"
const progressBarInstruments = "new-suggestion-progress-bar-instruments"
const progressBarReview = "new-suggestion-progress-bar-review"

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
