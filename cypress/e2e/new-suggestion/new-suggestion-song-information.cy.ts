import { updateNewSuggestion } from "@/redux/slices/new-suggestion.slice"
import {
  shouldGoToInstrumentsArea,
  newSuggestionFilledSongInformation,
  shouldContainJSONSongInformationInState
} from "./helpers/new-suggestion.helper"

const path = "/suggestions/new"
const buttonAddInstruments = "button-add-instruments"
const inputTitle = "input-title"
const inputArtist = "input-artist"
const inputLink = "input-link"
const inputMotivation = "input-motivation"

const requiredInputs = [
  {
    name: "title",
    inputField: inputTitle,
    error: "input-title-error"
  },
  {
    name: "artist",
    inputField: inputArtist,
    error: "input-artist-error"
  },
  {
    name: "motivation",
    inputField: inputMotivation,
    error: "input-motivation-error"
  }
]

describe("when creating a new suggestion, adding song information", () => {
  beforeEach(() => {
    cy.login()
  })

  // context("with no song information", () => {
  //   beforeEach(() => {
  //     cy.visit(path)
  //     cy.wait(500)
  //
  //     cy.data("area-song-information").then($component => {
  //       if ($component.find("input-artist").length == 0) {
  //         cy.data("manual-input-btn").click()
  //       }
  //     })
  //   })
  //
  //   context("the form", () => {
  //     it("should have no default values", () => {
  //       cy.data(inputArtist).invoke("val").should("be.empty")
  //       cy.data(inputArtist).invoke("val").should("be.empty")
  //       cy.data(inputLink).invoke("val").should("be.empty")
  //       cy.data(inputMotivation).invoke("val").should("be.empty")
  //     })
  //
  //     context("on submit", () => {
  //       requiredInputs.forEach(({ name, inputField, error }) => {
  //         it(`should show error if submitting with ${name} `, () => {
  //           cy.data(inputField).invoke("val").should("be.empty")
  //           cy.data(error).should("not.exist")
  //           cy.data(buttonAddInstruments).click()
  //           cy.data(error).should("be.visible")
  //           cy.data(inputField).should("have.css", "outline-color", "rgb(248, 113, 113)")
  //         })
  //
  //         it(`should show no error if submitting with ${name}`, () => {
  //           cy.data(inputField).type("Hello")
  //           cy.data(error).should("not.exist")
  //           cy.data(buttonAddInstruments).click()
  //           cy.data(error).should("not.exist")
  //           cy.data(inputField).should("not.have.css", "outline-color", "rgb(248, 113, 113)")
  //         })
  //       })
  //
  //       it("should go to InstrumentsArea if all required values are filled in", () => {
  //         cy.data(inputTitle).type("Hello")
  //         cy.data(inputArtist).type("Hello")
  //         cy.data(inputLink).type("www.hello.com")
  //         cy.data(inputMotivation).type("Hello")
  //         shouldGoToInstrumentsArea()
  //         cy.window()
  //           .its("store")
  //           .invoke("getState")
  //           .its("newSuggestion")
  //           .its("suggestion")
  //           .should("deep.equal", {
  //             title: "Hello",
  //             artist: ["Hello"],
  //             link: "www.hello.com",
  //             motivation: "Hello",
  //             instruments: []
  //           })
  //       })
  //     })
  //   })
  // })

  context("auto-filling values", () => {
    beforeEach(() => {
      cy.visit(path)
      cy.wait(500)
    })

    it("should display results when searching a song", () => {
      cy.intercept("GET", "api/spotify/search*", { fixture: "mock-search-result.json" }).as("mockedSearch")
      cy.data(inputTitle).type("A").then(() => {
        cy.wait("@mockedSearch")
        cy.data("song-information-dropdown").should("be.visible")
      })
    })

    it("should auto-fill song info", () => {
      cy.intercept("GET", "api/spotify/search*", { fixture: "mock-search-result.json" }).as("mockedSearch")
      cy.data(inputTitle).type("A").then(() => {
        cy.wait("@mockedSearch")
        cy.data("song-information-dropdown").children().first().click()
          .then(() => {
            cy.wait(100)
            cy.data("manual-input-btn").click()
          })
          .then(() => {
            cy.data(inputTitle).invoke("val").should("exist")
            cy.data(inputArtist).invoke("val").should("exist")
            cy.data(inputLink).invoke("val").should("exist")
          })
      })
    })

    it("trigger error handling on failed Spotify call", () => {
      cy.intercept({ url: "/api/spotify/search*" }, { forceNetworkError: true }).then(() => {
        cy.data(inputTitle).type("A")
        cy.data("search-error").should("be.visible")
      })
    })

  })

  // context("with filled in song information", () => {
  //   beforeEach(() => {
  //     cy.visit(path, {
  //       onBeforeLoad(win: Cypress.AUTWindow) {
  //         cy.window()
  //           .its("store")
  //           .invoke("dispatch", updateNewSuggestion(newSuggestionFilledSongInformation))
  //       }
  //     })
  //
  //     cy.data("area-song-information").then($component => {
  //       if ($component.find("input-artist").length == 0) {
  //         cy.data("manual-input-btn").click()
  //       }
  //     })
  //   })
  //
  //   it("should contain song information in state", () => {
  //     shouldContainJSONSongInformationInState()
  //   })
  //
  //   it("should fill in default values when filled in state", () => {
  //
  //     cy.data(inputTitle).invoke("val").should("equal", "Let It Be")
  //     cy.data(inputArtist).invoke("val").should("equal", "The Beatles")
  //     cy.data(inputMotivation).invoke("val").should("contain", "We have already sung it once")
  //   })
  //
  //   it("should render the instruments area on click", () => {
  //     shouldGoToInstrumentsArea()
  //     shouldContainJSONSongInformationInState()
  //   })
  // })

})
