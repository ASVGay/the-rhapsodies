// import { updateNewSuggestion } from "@/redux/slices/new-suggestion.slice"
import { updateNewSuggestion } from "@/redux/slices/new-suggestion.slice"
import {
  newSuggestionFilledSongInformation,
  shouldContainJSONSongInformationInState,
} from "./new-suggestion-song-information"
import { shouldGoToInstrumentsArea } from "../instruments/new-suggestion-instruments"

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

describe("when creating a new suggestion, adding song information", () => {
  beforeEach(() => {
    cy.login()
    cy.visit(path)
    cy.wait(500)
  })

  context("the form", () => {
    it("should have no default values", () => {
      cy.data(inputArtist).invoke("val").should("be.empty")
      cy.data(inputArtist).invoke("val").should("be.empty")
      cy.data(inputLink).invoke("val").should("be.empty")
      cy.data(inputMotivation).invoke("val").should("be.empty")
    })

    context("on submit", () => {
      requiredInputs.forEach(({ name, inputField, error }) => {
        it(`should show error if submitting with ${name} `, () => {
          cy.data(inputField).invoke("val").should("be.empty")
          cy.data(error).should("not.exist")
          cy.data(buttonAddInstruments).click()
          cy.data(error).should("be.visible")
          cy.data(inputField).should("have.css", "outline-color", "rgb(248, 113, 113)")
        })

        it(`should show no error if submitting with ${name}`, () => {
          cy.data(inputField).type("Hello")
          cy.data(error).should("not.exist")
          cy.data(buttonAddInstruments).click()
          cy.data(error).should("not.exist")
          cy.data(inputField).should("not.have.css", "outline-color", "rgb(248, 113, 113)")
        })
      })

      it("should go to InstrumentsArea if all required values are filled in", () => {
        cy.data(inputTitle).type("Hello")
        cy.data(inputArtist).type("Hello")
        cy.data(inputLink).type("www.hello.com")
        cy.data(inputMotivation).type("Hello")
        shouldGoToInstrumentsArea()
        cy.window()
          .its("store")
          .invoke("getState")
          .its("newSuggestion")
          .its("suggestion")
          .should("deep.equal", {
            title: "Hello",
            artist: ["Hello"],
            link: "www.hello.com",
            motivation: "Hello",
            instruments: [],
          })
      })
    })

    context("with filled in state", () => {
      beforeEach(() => {
        cy.visit(path, {
          onBeforeLoad(win: Cypress.AUTWindow) {
            cy.window()
              .its("store")
              .invoke("dispatch", updateNewSuggestion(newSuggestionFilledSongInformation))
          },
        })
      })

      it("should fill in default values when filled in state", () => {
        cy.data(inputTitle).invoke("val").should("equal", "Let It Be")
        cy.data(inputArtist).invoke("val").should("equal", "The Beatles")
        cy.data(inputMotivation).invoke("val").should("contain", "We have already sung it once")
      })

      it("should go to instruments area with data if filled in required fields", () => {
        shouldGoToInstrumentsArea()
        shouldContainJSONSongInformationInState()
      })

      context("on the next page", () => {
        it("should contain song information in state", () => {
          shouldGoToInstrumentsArea()
          shouldContainJSONSongInformationInState()
        })
      })
    })
  })
})
