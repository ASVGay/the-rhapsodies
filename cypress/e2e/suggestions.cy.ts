describe("suggestions page", () => {
  context("load suggestions", () => {
    beforeEach(() => {
      cy.login()
      cy.visit("/suggestions")
    })

    it("should have suggestions", () => {
      cy.data("suggestions-list").children().should("exist")
    })
  })

  context("select specific suggestion", () => {
    beforeEach(() => {
      cy.login()
      cy.visit("/suggestions")
    })

    it("should contain the right id in the url when clicking a suggestion", () => {
      cy.data("suggestion-card")
        .first()
        .invoke("attr", "href")
        .then((href) => {
          const id = href.split("/suggestions/")[1]
          cy.data("suggestion-card").first().click()
          cy.location().should((loc) => expect(loc.href).to.contains(id))
        })
    })
  })

  context("suggestions fetching edge cases", () => {
    beforeEach(() => {
      cy.login()
      cy.visit("/suggestions")
    })

    it("should display no suggestions message", () => {
      cy.intercept("/rest/v1/suggestion*", [])
      cy.data("no-suggestions-made").should("be.visible")
    })

    it("should display get suggestions error", () => {
      cy.intercept({ method: "GET", url: "/rest/v1/suggestion*" }, { forceNetworkError: true })
      cy.data("failed-fetching-suggestions").should("be.visible")
    })
  })

  context("spinner", () => {
    beforeEach(() => {
      cy.login()
      cy.visit("/suggestions")
    })

    it("should display spinner when suggestions are still being retrieved", () => {
      cy.intercept("GET", "/rest/v1/suggestion*").as("getSuggestions")
      cy.wait("@getSuggestions")
      cy.data("suggestions-spinner").should("exist")
    })

    it("shouldn't display spinner after suggestion have been retrieved", () => {
      cy.intercept("GET", "/rest/v1/suggestion*").as("getSuggestions")
      cy.wait("@getSuggestions").then(() => {
        cy.data("suggestions-spinner").should("not.exist")
      })
    })
  })
})
