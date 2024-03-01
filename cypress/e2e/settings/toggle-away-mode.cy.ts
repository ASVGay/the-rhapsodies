describe("for the away mode", () => {
  const awayModeToggle = "away-mode-toggle"
  const settingsPageUrl = "/settings"
  const awayModeButton = "away-mode-button"
  const awayModePageUrl = "/settings/away-mode"
  const backToSettingsButton = "back-to-settings"

  describe("on the settings page", () => {
    beforeEach(() => {
      cy.login()
      cy.visit(settingsPageUrl)
    })

    it("should go to the toggle away mode page when the button is clicked", () => {
      cy.data(awayModeButton).click()
      cy.location("pathname").should("eq", awayModePageUrl)
    })
  })

  describe("on the toggle away mode page", () => {
    beforeEach(() => {
      cy.login()
      cy.visit(awayModePageUrl)
      cy.wait(1000)
    })

    it("should enable the away mode", () => {
      cy.data(awayModeToggle).within(() => cy.get("label").click())
      cy.data(awayModeToggle).within(() =>
        cy.get("label").within(() => cy.get("input").should("be.checked")),
      )
    })

    it("should have a button that goes back to the settings page", () => {
      cy.data(backToSettingsButton).click()
      cy.location("pathname").should("eq", settingsPageUrl)
    })
  })
})
