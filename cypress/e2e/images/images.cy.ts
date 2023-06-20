const manualSongId = Cypress.env("CYPRESS_MANUAL_SONG")
const spotifySongId = Cypress.env("CYPRESS_SPOTIFY_SONG")

describe("song images", () => {
  beforeEach(() => {
    cy.login()
  })

  context("detail page images", () => {
    beforeEach(() => {
      cy.visit(`/repertoire/${spotifySongId}`)
    })

    it("should display image", () => {
      cy.data("song-image-preview").should("be.visible")
      cy.data("song-image").should("be.visible")
    })

    it("should toggle play song on image-click", () => {
      cy.data("player").then(($component) => {
        if ($component.find("pause-icon").length > 0) {
          cy.data("pause-icon").click()
          cy.data("play-icon").should("be.visible")
        }
        else if ($component.find("play-icon").length > 0) {
          cy.data("play-icon").click()
          cy.data("pause-icon").should("be.visible")
        }
      })
    })
  })

  context("detail page fallback options on manual input song", () => {
    beforeEach(() => {
      cy.visit(`/repertoire/${manualSongId}`)
    })

    it("should display fallback image on no image", () => {
      cy.data("song-image-preview").should("be.visible")
      cy.data("no-sound").should("be.visible")
    })
  })
})