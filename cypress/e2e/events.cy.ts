import { interceptIndefinitely } from "./helpers/interception.helper"

describe("events page", () => {
  beforeEach(() => {
    cy.login()
    cy.visit("events")
  })

  it("should display correct amount of events", () => {
    cy.intercept("GET", "/rest/v1/event*", { fixture: "mock-events.json" }).as("mockedRequest")
    cy.wait("@mockedRequest")
    cy.wait(1000)
    cy.data("event-list").children().should("have.length", 4)
  })

  it("should display loader", () => {
    const interception = interceptIndefinitely("GET", "/rest/v1/event*")
    cy.data("song-list-spinner").should("exist")
    interception.sendResponse()
    cy.data("song-list-spinner").should("not.exist")
  })

  it("should display correct error message when error is thrown", () => {
    cy.intercept("GET", "/rest/v1/event*", {
      forceNetworkError: true,
    })
    cy.data("no-events-text").contains("Failed to load events, try refreshing the page.")
  })

  it("should display correct error message when there are no events yet", () => {
    cy.intercept("GET", "/rest/v1/event*", []).as("mockedRequest")
    cy.wait("@mockedRequest")
    cy.wait(1000)
    cy.data("no-events-text").contains("No Events have been added yet.")
  })
})
