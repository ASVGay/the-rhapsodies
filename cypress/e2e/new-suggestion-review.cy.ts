import { NewSuggestion } from "@/interfaces/new-suggestion"

export const ReviewPlaceholder = {
  title: "Unknown",
  artist: "Unknown",
  motivation: "Please provide a description of why you'd like to suggest this song.",
  instruments: "No instruments have been selected yet.."
}

describe("review new suggestion page", () => {
  context("review new suggestion details", () => {
    beforeEach(() => {
      cy.login()
      cy.visit(`/suggestions/new`)
      cy.data("new-suggestion-progress-bar-review").click()
    })

    it("should display Redux content or placeholder if no content is present yet", () => {
      cy.window().its("store")
        .invoke("getState").its("newSuggestion.suggestion")
        .then((state: NewSuggestion) => {
          cy.data("review-title").invoke("text")
            .should("equal", state.title.length == 0 ? ReviewPlaceholder.title : state.title)
          cy.data("review-artists").invoke("text")
            .should("equal", state.artist.length == 0 ? ReviewPlaceholder.artist : state.artist)
          cy.data("review-motivation").invoke("text")
            .should("equal", state.motivation.length == 0 ? ReviewPlaceholder.motivation : state.motivation)
          state.instruments.length == 0
            ? cy.data("review-instruments").invoke("text").should("equal", ReviewPlaceholder.instruments)
            : cy.data("review-instruments").children().should("have.length", state.instruments.length)
        })
    })

  })

  context("all required suggestions data is present", () => {
    beforeEach(() => {
      cy.login()
      cy.visit(`/suggestions/new`)
      cy.data("new-suggestion-progress-bar-review").click()
    })

    it("should display spinner while creating a new suggestion", () => {

    })

    it("should display error-element if insert call(s) fail", () => {

    })

    it("should be able to press submit button", () => {

    })

    it("should redirect to the suggestions page after saving a new suggestion", () => {
      // cy.data("submit-suggestion-btn").click()
      //   .then(() => {
      //     cy.location("pathname").should("equal", "/suggestions")
      //   })
    })

  })

  context("not all required suggestion data is present", () => {
    beforeEach(() => {
      cy.login()
      cy.visit(`/suggestions/new`)
      cy.data("new-suggestion-progress-bar-review").click()
    })

    it("shouldn't be able to press submit button", () => {

    })

  })

})