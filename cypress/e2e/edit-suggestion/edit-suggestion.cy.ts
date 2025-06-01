import {
  addInstrumentItem,
  shouldGoToReviewArea,
} from "../new-suggestion/helpers/new-suggestion.helper"
import { User } from "../../support/user.enum"
import { TESTING } from "../../support/constants"

const userSuggestion = "ca20ae76-f6b3-4224-99af-cac14643a967"
const userSecondSuggestion = "e743664e-b85b-4164-8163-24c9957f5ffd"
const notOfUserSuggestion = "687d4b20-9c34-4ff5-a1b5-ab4ca54c008c"

describe("when the user wants to edit a suggestion", () => {
  context("when visiting a suggestion detail page", () => {
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

    context("while user is not authorized to edit", () => {
      beforeEach(() => {
        cy.login(User.USER)
        cy.visit(`suggestions/${TESTING.idSongNoAuthor}`)
      })

      it("should not show the edit button", () => {
        cy.data("suggestion-edit-icon").should("not.exist")
      })
    })
  })

  context("when visiting the edit suggestion page", () => {
    context("while user is authorized to edit", () => {
      beforeEach(() => {
        cy.login()
        cy.visit(`suggestions/edit/${userSuggestion}`)
        // Wait so content can render properly and set up submit events
        cy.wait(500)
        // Set up intercepts
        cy.intercept("DELETE", "/rest/v1/song_instrument*", { statusCode: 204 })
        cy.intercept("POST", "/rest/v1/song_instrument*", { statusCode: 201 })
        cy.intercept("PATCH", "/rest/v1/song_instrument*", { statusCode: 201 })
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
        cy.data("instrument-edit-list")
          .children()
          .then((elements) => {
            // Keep a count of how many items the list had. This is done dynamicaly to prevent
            const countOfInstruments = elements.length - 1
            // Remove a instrument (should be 3)
            cy.data("delete-button").first().click()
            // Submit the changes by switching area.
            cy.data("new-suggestion-progress-bar-review").click()
            // Leave edit page and revisit the instrument area
            cy.data("button-discard-new-suggestion").click()
            cy.data("suggestion-edit-icon").click()
            cy.data("new-suggestion-progress-bar-instruments").click()
            cy.data("instrument-edit-list")
              .children()
              .should("have.length.above", countOfInstruments - 1)
          })
      })

      it("should change to a different suggestion's data when switching between suggestion edits", () => {
        const firstInputText = cy.data("input-title").invoke("val")
        cy.visit(`suggestions/edit/${userSecondSuggestion}`)
        cy.data("input-title").should("not.contain", firstInputText)
      })

      it("should redirect to the suggestion detail page after saving the suggestion", () => {
        cy.wait(500)
        cy.data("new-suggestion-progress-bar-review").click()
        cy.data("submit-suggestion-btn")
          .click()
          .then(() => {
            cy.location("pathname", { timeout: 10000 }).should(
              "equal",
              `/suggestions/${userSuggestion}`,
            )
          })
      })

      it("should apply changes from instrument after saving the suggestion", () => {
        cy.wait(500)
        cy.data("new-suggestion-progress-bar-instruments").click()
        addInstrumentItem()
        shouldGoToReviewArea()
        cy.data("submit-suggestion-btn")
          .click()
          .then(() => {
            cy.location("pathname", { timeout: 10000 }).should(
              "equal",
              `/suggestions/${userSuggestion}`,
            )
          })
      })
    })

    context("while user is not authorized to edit", () => {
      beforeEach(() => {
        cy.login(User.USER)
        cy.visit(`suggestions/edit/${notOfUserSuggestion}`)
      })

      it("should redirect to the forbidden page", () => {
        cy.location("pathname").should("eq", `/403`)
      })
    })
  })
})
