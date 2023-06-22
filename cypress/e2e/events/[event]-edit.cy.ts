describe("the edit event page", () => {
  const eventId = Cypress.env("CYPRESS_EVENT_ID")
  const path = `/events/${eventId}/edit`

  beforeEach(() => {
    cy.login()
    cy.visit(path)
  })

  it("should auto fill values", () => {
    cy.data("event-type-select").invoke("val").should("equal", "brainstormborrel")
    cy.get("#date-picker input").invoke("val").should("equal", "Wednesday, June 14")
    cy.data("start-time-select").invoke("val").should("equal", "19:00")
    cy.data("end-time-select").invoke("val").should("equal", "21:00")
    cy.data("input-location").invoke("val").should("equal", "CREA 3.14")
  })

  it("should go back to specified event on close button", () => {
    cy.data("close-event-form")
      .click()
      .then(() => {
        cy.location("pathname").should("equal", `/events/${eventId}`)
      })
  })
})
