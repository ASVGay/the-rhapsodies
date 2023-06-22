import { interceptIndefinitely } from "../helpers/interception.helper"

describe("the edit event page", () => {
  const eventId = Cypress.env("CYPRESS_EVENT_ID")
  const path = `/events/${eventId}/edit`
  const redirectPath = `/events/${eventId}`
  const requestPath = "/rest/v1/event?id=**"
  const buttonSubmitEvent = "button-add-event"

  beforeEach(() => {
    cy.login()
    cy.visit(path)
  })

  it("should auto fill values", () => {
    cy.data("event-type-select").invoke("val").should("equal", "brainstormborrel")
    cy.get("#date-picker input").invoke("val").should("equal", "Wednesday, June 14")

    cy.data("start-time-select")
      .invoke("val")
      .should("match", /^(0\d|1\d|2[0-3]):[0-5]\d/)
    cy.data("end-time-select")
      .invoke("val")
      .should("match", /^(0\d|1\d|2[0-3]):[0-5]\d/)
    cy.data("input-location").invoke("val").should("equal", "CREA 3.14")
  })

  it("should go back to specified event on close button", () => {
    cy.data("close-event-form")
      .click()
      .then(() => {
        cy.location("pathname").should("equal", redirectPath)
      })
  })

  context("when submitting", () => {
    beforeEach(() => {
      cy.wait(500)
      cy.data("start-time-select").select("13:00")
      cy.data("end-time-select").select("16:00")
      cy.data("event-type-select").select("rehearsal")
      cy.data("input-location").type("Amsterdam")
    })

    it("should contain updated values in request", () => {
      cy.intercept(requestPath, { statusCode: 204 }).as("submit")
      cy.data(buttonSubmitEvent).click()
      cy.wait("@submit").then((xhr) => {
        const body = xhr.request.body
        expect(body.start_time).to.match(/2023-06-14T\d\d:00:00.000Z/)
        expect(body.end_time).to.match(/2023-06-14T\d\d:00:00.000Z/)
        expect(body.event_type).to.contain("rehearsal")
        expect(body.location).to.contain("Amsterdam")
      })
    })

    it("should show success toast and redirect on successful submit request", () => {
      const interception = interceptIndefinitely(requestPath, { statusCode: 204 })
      cy.data(buttonSubmitEvent)
        .click()
        .then(() => {
          cy.data("event-form-spinner").should("be.visible")
          interception.sendResponse()
          cy.data("event-form-spinner").should("not.exist")
          cy.location("pathname").should("equal", redirectPath)
          cy.get(".Toastify")
            .get("#1")
            .should("be.visible")
            .should("have.class", "Toastify__toast--success")
        })
    })

    it("should show error toast and stay on page on failed submit request", () => {
      cy.intercept(requestPath, { statusCode: 401 })
      cy.data(buttonSubmitEvent)
        .click()
        .then(() => {
          cy.location("pathname").should("equal", path)
          cy.get(".Toastify")
            .get("#1")
            .should("be.visible")
            .should("have.class", "Toastify__toast--error")
        })
    })
  })
})
