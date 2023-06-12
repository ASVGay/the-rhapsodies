import {
  addInstrumentItem,
  shouldGoToReviewArea,
} from "../new-suggestion/helpers/new-suggestion.helper"

const userSuggestion = "ca20ae76-f6b3-4224-99af-cac14643a967"
const userSecondSuggestion = "e743664e-b85b-4164-8163-24c9957f5ffd"
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

      it("should show the edit button", () => {
        cy.data("suggestion-edit-icon").should("exist")
      })

      it("the edit button brings the user to the edit page", () => {
        cy.data("suggestion-edit-icon").click()
        cy.location("pathname").should("eq", `/suggestions/edit/${userSuggestion}`)
      })
    })
  })

  context("when visiting the edit suggestion page", () => {
    context("while user is unauthorized to edit", () => {
      beforeEach(() => {
        cy.login()
        cy.visit(`suggestions/edit/${notOfUserSuggestion}`)
        // Wait so content can render properly and set up submit events
        cy.wait(500)
      })

      it("should force the user to the 403 page", () => {
        cy.location("pathname").should("eq", `/403`)
        cy.data("403-page").should("be.visible")
      })
    })

    context("while user is authorized to edit", () => {
      beforeEach(() => {
        cy.login()
        cy.visit(`suggestions/edit/${userSuggestion}`)
        // Wait so content can render properly and set up submit events
        cy.wait(500)
      })

      it("should maintain changes to the song information when revisiting ", () => {
        cy.data("input-title").clear()
        cy.data("input-title").type("Hello")
        //Proceed to commit changes to redux
        cy.data("new-suggestion-progress-bar-instruments").click()
        // Leave edit page and revisit
        cy.data("button-discard-new-suggestion").click()
        cy.data("suggestion-edit-icon").click()
        cy.wait(500)
        cy.data("new-suggestion-progress-bar-song-information").click()
        cy.data("input-title").invoke("val").should("equal", "Hello")
      })

      it("should maintain changes to the instruments when revisiting", () => {
        cy.data("new-suggestion-progress-bar-instruments").click()
        // Remove a instrument (should be 3)
        cy.data("delete-button").first().click()
        // Submit the changes by switching area.
        cy.data("new-suggestion-progress-bar-review").click()
        // Leave edit page and revisit the instrument area
        cy.data("button-discard-new-suggestion").click()
        cy.data("suggestion-edit-icon").click()
        cy.wait(500)
        cy.data("new-suggestion-progress-bar-instruments").click()
        cy.data("instrument-edit-list").children().should("have.length", 3)
      })

      it("should change to a different suggestion's data when switching between suggestion edits", () => {
        const firstInputText = cy.data("input-title").invoke("val")
        cy.visit(`suggestions/edit/${userSecondSuggestion}`)
        cy.data("input-title").should("not.contain", firstInputText)
      })

      it("should redirect to the suggestion detail page after saving the suggestion", () => {
        cy.data("new-suggestion-progress-bar-review").click()
        cy.data("submit-suggestion-btn")
          .click()
          .then(() => {
            cy.location("pathname").should("equal", `/suggestions/${userSuggestion}`)
          })
      })

      it("should apply changes from instrument after saving the suggestion", () => {
        cy.data("new-suggestion-progress-bar-instruments").click()
        addInstrumentItem()
        shouldGoToReviewArea()
        cy.data("submit-suggestion-btn")
          .click()
          .then(() => {
            cy.location("pathname").should("equal", `/suggestions/${userSuggestion}`)
          })
      })
    })
  })
})
