describe("on the specific event page", () => {
  const eventId = Cypress.env("CYPRESS_EVENT_ID")
  const attending = ["present", "absent", "undecided"]

  beforeEach(() => {
    cy.login()
    cy.visit(`/events/${eventId}`)
  })

  it("should render event info correctly", () => {
    cy.data("event-title").should("have.text", "Brainstormborrel")
    cy.data("event-date").should("have.text", "Wednesday, June 14")
    cy.data("event-time")
      .invoke("text")
      .should("match", /^(0\d|1\d|2[0-3]):[0-5]\d - (0\d|1\d|2[0-3]):[0-5]\d$/)
    cy.data("event-location").should("have.text", "CREA 3.14")
  })

  it("should go back to events on click of X", () => {
    cy.location("pathname").should("equal", `/events/${eventId}`)
    cy.data("button-back-to-events").click()
    cy.location("pathname").should("equal", "/events")
  })

  it("should show 404 with not existing event id", () => {
    cy.visit(`/events/2c5b40c0-983e-44c1-a056-9981a0a84bac`, { failOnStatusCode: false })
    cy.get("h1").should("contain.text", "404")
  })

  context("the attendance button", () => {
    it("should show undecided if empty database", () => {
      cy.intercept("/rest/v1/attendee*", []).as("attendance")
      cy.wait("@attendance")
      cy.get("#undecided").should("be.checked")
    })

    attending.forEach((attendance) => {
      it(`should show the ${attendance} state if attending is ${attendance}`, () => {
        cy.intercept("/rest/v1/attendee*", [{ attending: attendance }]).as("attendance")
        cy.wait("@attendance")
        cy.get(`#${attendance}`).should("be.checked")
      })
    })

    it("should stay checked if attendance update succeeds", () => {
      cy.intercept("/rest/v1/attendee*", []).as("attendance")
      cy.wait("@attendance")
      cy.get("#undecided").should("be.checked")
      cy.intercept("/rest/v1/attendee*", { attending: "present" }).as("attendance-update")
      cy.get("#present").parent().click()
      cy.wait("@attendance-update")
      cy.get(`#present`).should("be.checked")
    })

    it("should show toast and check previous if attendance update fails", () => {
      cy.intercept("/rest/v1/attendee*", []).as("attendance")
      cy.wait("@attendance")
      cy.get("#undecided").should("be.checked")
      cy.intercept("/rest/v1/attendee*", {
        statusCode: 400,
        body: { error: "error" },
      })
      cy.get("#present").parent().click()
      cy.get(`#present`).should("not.be.checked")
      cy.get(`#undecided`).should("be.checked")
    })
  })
})
