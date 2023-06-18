import { interceptIndefinitely } from "../helpers/interception.helper"

describe("events page", () => {
  const eventsRequestPath = "/rest/v1/rpc/get_events_with_attendance"

  beforeEach(() => {
    cy.login()
  })

  it("should display correct amount of events", () => {
    cy.intercept("GET", eventsRequestPath, { fixture: "mock-events.json" })
    cy.visit("events")
    cy.data("event-list").children().should("have.length", 4)
  })

  it("should display loader", () => {
    const interception = interceptIndefinitely(eventsRequestPath)
    cy.visit("events")
    cy.data("song-list-spinner").should("exist")
    interception.sendResponse()
    cy.data("song-list-spinner").should("not.exist")
  })

  it("should display correct error message when error is thrown", () => {
    cy.intercept(eventsRequestPath, {
      forceNetworkError: true,
    })
    cy.visit("events")
    cy.data("no-events-text").contains("Failed to load events.")
  })

  it("should display correct error message when there are no events yet", () => {
    cy.intercept(eventsRequestPath, [])
    cy.visit("events")
    cy.data("no-events-text").contains("No events have been added yet.")
  })
})
