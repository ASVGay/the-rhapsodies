import { shouldBeEmptyState } from "../new-suggestion/helpers/new-suggestion.helper"

let cachedSuggestionId = ""

const userSuggestion = "ca20ae76-f6b3-4224-99af-cac14643a967"
const notOfUserSuggestion = "f0a04fe5-8290-445b-af94-1b2ae0263431"

describe("when the user wants to edit a suggestion", () => {
  context("when visiting a suggestion detail page", () => {
    context("while user is unauthorized to edit", () => {
      beforeEach(() => {
        cy.login()
        cy.visit(`suggestions/${notOfUserSuggestion}`)
        // Wait so content can render properly and set up submit events
        cy.wait(500)
      })

      it("shouldn't show the edit button", () => {
        cy.data("suggestion-edit-icon").should("not.exist")
      })
    })
    context("while user is authorized to edit", () => {
      beforeEach(() => {
        cy.login()
        cy.visit(`suggestions/${userSuggestion}`)
        // Wait so content can render properly and set up submit events
        cy.wait(500)
      })

      it("shouldn't show the edit button", () => {
        cy.data("suggestion-edit-icon").should("exist")
      })

      it("the edit button brings the user to the edit page", () => {
        cy.data("suggestion-edit-icon").click()
        cy.location("pathname").should("eq", `/suggestions/edit/${userSuggestion}`)
      })
    })
  })

  // context("on page load", () => {
  //   it("should go to suggestions on discard", () => {
  //     cy.data(buttonDiscardNewSuggestion).click()
  //     cy.location("pathname").should("eq", "/suggestions")
  //   })

  //   it("should have empty state on load", () => {
  //     shouldBeEmptyState()
  //   })
  // })

  // context("with no song information", () => {
  //   context("the progress bar", () => {
  //     instrumentsAndReviewArea.forEach(({ area, progressBarItem }) => {
  //       context(`when attempting to go to ${area} area`, () => {
  //         it("should show toast", () => {
  //           cy.data(progressBarItem).click()
  //           cy.get(".Toastify")
  //             .get("#1")
  //             .get(".Toastify__toast-body")
  //             .should("have.text", "You need to fill in all the required fields before continuing")
  //         })

  //         it("should stay on the song information", () => {
  //           cy.data(progressBarItem).click()
  //           cy.data(areaSongInformation).should("be.visible")
  //           cy.data(areaInstruments).should("not.exist")
  //           cy.data(areaReview).should("not.exist")
  //         })
  //       })

  //       it("should show errors on form", () => {
  //         cy.get(".error-message").should("not.exist")
  //         cy.data(progressBarItem).click()
  //         cy.get(".error-message").should("have.length", 3)
  //       })
  //     })
  //   })
  // })
  // context("with song information", () => {
  //   it("should render the same active area with state content on change of page", () => {
  //     fillSongInformationSuccessfully()
  //     cy.data(progressBarInstruments).click()
  //     areaInStateShouldBe(Area.Instruments)
  //     shouldContainJSONSongInformationInState()
  //     cy.data(buttonDiscardNewSuggestion).click()
  //     cy.data("button-new-suggestion").click()
  //     cy.data(areaInstruments).should("be.visible")
  //     areaInStateShouldBe(Area.Instruments)
  //     cy.data(areaSongInformation).should("not.exist")
  //     cy.data(areaReview).should("not.exist")
  //     cy.data(progressBar).invoke("data", "active-area").should("equal", Area.Instruments)
  //     shouldContainJSONSongInformationInState()
  //   })
  // })
})
