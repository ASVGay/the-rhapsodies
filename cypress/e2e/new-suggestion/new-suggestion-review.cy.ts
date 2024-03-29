import { ISuggestion } from "@/interfaces/suggestion"
import { newSuggestionFilledInInstruments } from "./helpers/new-suggestion.helper"
import { updateNewSuggestion } from "@/redux/slices/new-suggestion.slice"

const progressBarReview = "new-suggestion-progress-bar-review"

const setUp = () => {
  cy.login()
  cy.visit("/suggestions/new", {
    onBeforeLoad(win: Cypress.AUTWindow) {
      cy.window()
        .its("store")
        .invoke("dispatch", updateNewSuggestion(newSuggestionFilledInInstruments))
    },
  })

  cy.wait(500) // Wait so content can render properly and set up submit events
  cy.data(progressBarReview).click()
}

describe("review new suggestion page", () => {
  context("review new suggestion details", () => {
    beforeEach(() => {
      setUp()
    })

    it("should display Redux content in UI", () => {
      cy.window()
        .its("store")
        .invoke("getState")
        .its("newSuggestion.suggestion")
        .then((state: ISuggestion) => {
          cy.data("review-title").invoke("text").should("equal", state.title)
          state.artist.forEach((artist) =>
            cy.data("review-artists").invoke("text").should("contain", artist),
          )
          cy.data("review-motivation").invoke("text").should("equal", state.motivation)
          cy.data("review-link").invoke("attr", "href").should("equal", state.link)
          cy.data("review-instruments").children().should("have.length", state.instruments.length)
        })
    })
  })

  context("save new suggestion", () => {
    beforeEach(() => {
      setUp()
    })

    it("should display spinner while creating a new suggestion", () => {
      cy.data("submit-suggestion-btn")
        .click()
        .then(() => {
          cy.data("suggestions-spinner").should("be.visible")
        })
    })

    it("should display error-element if insert call(s) fail", () => {
      cy.intercept({ url: "/rest/v1/song*" }, { forceNetworkError: true }).then(() => {
        cy.data("submit-suggestion-btn").click()
        cy.data("new-suggestion-insert-error").should("be.visible")
      })
    })

    it("should redirect to the suggestions page after saving a new suggestion", () => {
      cy.data("submit-suggestion-btn")
        .click()
        .then(() => {
          cy.location("pathname").should("equal", "/suggestions")
        })
    })
  })
})
