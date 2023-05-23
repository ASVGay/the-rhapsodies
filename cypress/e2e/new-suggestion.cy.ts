import { updateNewSuggestion } from "@/redux/slices/new-suggestion.slice"

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

function shouldGoToInstrumentsArea() {
  cy.data(buttonAddInstruments).click()
  cy.data(areaInstruments).should("be.visible")
  cy.data(areaSongInformation).should("not.exist")
  cy.data(areaReview).should("not.exist")
  cy.data(progressBar).invoke("data", "active-area").should("equal", Area.Instruments)
  areaInStateShouldBe(Area.Instruments)
}

function shouldContainJSONSongInformationInState() {
  cy.fixture("state-filled-in-song-information.json").then((songInfo) => {
    cy.window()
      .its("store")
      .invoke("getState")
      .its("newSuggestion")
      .its("suggestion")
      .should("deep.equal", songInfo.newSuggestion.suggestion)
  })
}

function areaInStateShouldBe(area: Area) {
  cy.window()
    .its("store")
    .invoke("getState")
    .its("newSuggestion")
    .its("activeArea")
    .should("equal", area)
}

describe("when creating a new suggestion", function () {
  beforeEach(() => {
    cy.login()
  })
  context("on page load", () => {
    beforeEach(() => {
      cy.visit(path)
    })

    it("should go to suggestions on discard", function () {
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
      it("should render the song-information area on click", () => {
        cy.data(progressBarSongInformation).click()
        cy.data(areaSongInformation).should("be.visible")
        cy.data(areaInstruments).should("not.exist")
        cy.data(areaReview).should("not.exist")
        cy.data(progressBar).invoke("data", "active-area").should("equal", Area.SongInformation)
      })

      instrumentsAndReviewArea.forEach(({ area, progressBarItem }) => {
        context(`when attempting to go to ${area} area`, () => {
          it("should show toast", function () {
            cy.data(progressBarItem).click()
            cy.get(".Toastify")
              .get("#1")
              .get(".Toastify__toast-body")
              .should("have.text", "You need to fill in all the required fields before continuing")
          })

          it("should stay on the song information", function () {
            cy.data(progressBarItem).click()
            cy.data(areaSongInformation).should("be.visible")
            cy.data(areaInstruments).should("not.exist")
            cy.data(areaReview).should("not.exist")
          })
        })

        it("should show errors on form", function () {
          cy.get(".error-message").should("not.exist")
          cy.data(progressBarItem).click()
          cy.get(".error-message").should("have.length", 3)
        })
      })
    })

    context("the form", () => {
      it("should have no default values", function () {
        cy.data(inputArtist).invoke("val").should("be.empty")
        cy.data(inputArtist).invoke("val").should("be.empty")
        cy.data(inputLink).invoke("val").should("be.empty")
        cy.data(inputMotivation).invoke("val").should("be.empty")
      })

      context("on submit", () => {
        requiredInputs.forEach(({ name, inputField, error }) => {
          it(`should show error if submitting with ${name} `, function () {
            cy.data(inputField).invoke("val").should("be.empty")
            cy.data(error).should("not.exist")
            cy.data(buttonAddInstruments).click()
            cy.data(error).should("be.visible")
            cy.data(inputField).should("have.css", "outline-color", "rgb(248, 113, 113)")
          })

          it(`should show no error if submitting with ${name}`, function () {
            cy.data(inputField).type("Hello")
            cy.data(error).should("not.exist")
            cy.data(buttonAddInstruments).click()
            cy.data(error).should("not.exist")
            cy.data(inputField).should("not.have.css", "outline-color", "rgb(248, 113, 113)")
          })
        })

        it("should go to InstrumentsArea if all required values are filled in", function () {
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
    })
  })

  context("with filled in song information", () => {
    beforeEach(() => {
      cy.fixture("state-filled-in-song-information.json").then((songInfo) => {
        cy.visit(path, {
          onBeforeLoad(win: Cypress.AUTWindow) {
            cy.window()
              .its("store")
              .invoke("dispatch", updateNewSuggestion(songInfo.newSuggestion.suggestion))
          },
        })
      })
      cy.wait(500)
    })

    it("should contain song information in state", () => {
      cy.fixture("state-filled-in-song-information.json").then((songInfo) => {
        areaInStateShouldBe(songInfo.newSuggestion.activeArea)
      })

      shouldContainJSONSongInformationInState()
    })

    context("the progress bar", () => {
      it("should render the instruments area on click", () => {
        cy.data(progressBarInstruments).click()
        areaInStateShouldBe(Area.Instruments)
        cy.data(areaInstruments).should("be.visible")
        cy.data(areaSongInformation).should("not.exist")
        cy.data(areaReview).should("not.exist")
        cy.data(progressBar).invoke("data", "active-area").should("equal", Area.Instruments)
        shouldContainJSONSongInformationInState()
      })

      it("should render the review area on click", () => {
        cy.data(progressBarReview).click()
        areaInStateShouldBe(Area.Review)
        cy.data(areaReview).should("be.visible")
        cy.data(areaSongInformation).should("not.exist")
        cy.data(areaInstruments).should("not.exist")
        cy.data(progressBar).invoke("data", "active-area").should("equal", Area.Review)
        shouldContainJSONSongInformationInState()
      })

      it("should render the same active area with state content on change of page", function () {
        cy.data(progressBarReview).click()
        areaInStateShouldBe(Area.Review)
        cy.data(buttonDiscardNewSuggestion).click()
        cy.data("button-new-suggestion").click()
        cy.data(areaReview).should("be.visible")
        cy.data(areaReview).should("contain.text", "Let It Be")
        areaInStateShouldBe(Area.Review)
        cy.data(areaSongInformation).should("not.exist")
        cy.data(areaInstruments).should("not.exist")
        cy.data(progressBar).invoke("data", "active-area").should("equal", Area.Review)
        shouldContainJSONSongInformationInState()
      })
    })

    context("the form", () => {
      it("should fill in default values when filled in state", function () {
        cy.data(inputTitle).invoke("val").should("equal", "Let It Be")
        cy.data(inputArtist).invoke("val").should("equal", "The Beatles")
        cy.data(inputMotivation).invoke("val").should("contain", "We have already sung it once")
      })

      it("should go to instruments area with data if filled in required fields", function () {
        shouldGoToInstrumentsArea()
        shouldContainJSONSongInformationInState()
      })
    })
  })
})
