import { interceptIndefinitely } from "../helpers/interception.helper"
import { mockGetMembersByEvent } from "../../fixtures/mock-get-members-by-event"

const deleteCommentButton = "delete-comment-button"
const getCommentPath = "/rest/v1/attendee?select=comment&event_id=**&member_id=**"
const setCommentPath = "/rest/v1/attendee"
const attendancePath = "/rest/v1/attendee?select=attending&event_id=**member_id=**"
const addCommentButtonLoader = "add-comment-button-loader"
describe("on the specific event page", () => {
  const eventId = Cypress.env("CYPRESS_EVENT_ID")
  const path = `/events/${eventId}`
  const attending = ["present", "absent", "undecided"]
  const inputPresentMembers = "#present-members"
  const inputAbsentMembers = "#absent-members"
  const inputUndecidedMembers = "#undecided-members"
  const inputPresent = "#present"
  const inputUndecided = `#undecided`
  const addCommentButton = "add-comment-button"
  const addCommentOverlay = "add-comment-overlay"
  const inputComment = "input-comment"

  beforeEach(() => {
    cy.login()
  })

  context("without existing comment", () => {
    beforeEach(() => cy.visit(path))
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
      it("should show the loading state while retrieving data on page load", () => {
        const interception = interceptIndefinitely(attendancePath, { body: [] })
        cy.data("loading").should("be.visible")
        interception.sendResponse()
        cy.data("loading").should("not.be.visible")
      })

      it("should show undecided if empty database", () => {
        cy.intercept(attendancePath, []).as("attendance")
        cy.wait("@attendance")
        cy.get(inputUndecided).should("be.checked")
      })

      attending.forEach((attendance) => {
        it(`should show the ${attendance} state if attending is ${attendance}`, () => {
          cy.intercept(attendancePath, [{ attending: attendance }]).as("attendance")
          cy.wait("@attendance")
          cy.get(`#${attendance}`).should("be.checked")
        })
      })

      it("should show loader when updating attendance", () => {
        cy.intercept("*")
        cy.intercept(attendancePath, []).as("attendance")
        cy.wait("@attendance")
        const interception = interceptIndefinitely(attendancePath, {
          body: { attending: "present" },
        })
        cy.get(inputPresent).parent().click()
        cy.data("loading")
          .should("be.visible")
          .then(() => {
            interception.sendResponse()
            cy.data("loading").should("not.be.visible")
          })
      })
      it("should stay checked if attendance update succeeds", () => {
        cy.intercept(attendancePath, []).as("attendance")
        cy.wait("@attendance")
        cy.get(inputUndecided).should("be.checked")
        cy.intercept("/rest/v1/attendee*", { attending: "present" }).as("attendance-update")
        cy.get(inputPresent).parent().click()
        cy.wait("@attendance-update")
        cy.get(inputPresent).should("be.checked")
      })

      it("should show toast and check previous if attendance update fails", () => {
        cy.intercept(attendancePath, []).as("attendance")
        cy.wait("@attendance")
        cy.get(inputUndecided).should("be.checked")
        cy.intercept("/rest/v1/attendee*", {
          statusCode: 400,
          body: { error: "error" },
        })
        cy.get(inputPresent).parent().click()
        cy.get(inputPresent).should("not.be.checked")
        cy.get(inputUndecided).should("be.checked")
      })
    })

    context("the attending list", () => {
      it("should display the data correctly", () => {
        const presentMembersList = "present-members-list"
        const absentMembersList = "absent-members-list"
        const undecidedMembersList = "undecided-members-list"
        cy.intercept("/rest/v1/rpc/get_members_by_event", { body: mockGetMembersByEvent })
        cy.log("Check present members")
        cy.get(inputPresentMembers).should("be.checked")
        cy.data(absentMembersList).should("not.be.visible")
        cy.data(undecidedMembersList).should("not.be.visible")
        cy.data(presentMembersList)
          .should("be.visible")
          .children()
          .should("have.length", 1)
          .should("have.text", "FeryllHello")

        cy.log("Check absent members")
        cy.get(inputAbsentMembers).parent().click()
        cy.data(presentMembersList).should("not.be.visible")
        cy.data(undecidedMembersList).should("not.be.visible")
        cy.data(absentMembersList)
          .should("be.visible")
          .children()
          .should("have.length", 1)
          .should("have.text", "Kevin")

        cy.log("Check undecided members")
        cy.get(inputUndecidedMembers).parent().click()
        cy.data(presentMembersList).should("not.be.visible")
        cy.data(absentMembersList).should("not.be.visible")
        cy.data(undecidedMembersList)
          .should("be.visible")
          .within(() => {
            cy.get("li").each(($child, index) => {
              switch (index) {
                case 0:
                  cy.wrap($child).should("have.text", "Marcel")
                  break
                case 1:
                  cy.wrap($child).should("have.text", "Old").should("have.class", "text-moon")
                  break
                case 2:
                  cy.wrap($child).should("have.text", "Rens")
                  break
              }
            })
          })
      })

      it("should show the loading state when fetching data after page load", () => {
        const interception = interceptIndefinitely("/rest/v1/rpc/get_members_by_event", {
          body: [],
        })
        cy.data("loading-attending-members").should("be.visible")
        interception.sendResponse()
        cy.data("loading-attending-members").should("not.be.visible")
      })

      it("should show a toast & error text if fetching data went wrong", () => {
        cy.intercept("/rest/v1/rpc/get_members_by_event", { statusCode: 400 })
        cy.get(".Toastify")
          .get("#toast-attending-members")
          .get(".Toastify__toast-body")
          .should("contain.text", "Something went wrong")

        const failedAttendingMembers = "failed-attending-members"
        cy.get(inputPresentMembers).should("be.checked")
        cy.data(failedAttendingMembers).should("be.visible")
        cy.get(inputAbsentMembers).parent().click()
        cy.data(failedAttendingMembers).should("be.visible")
        cy.get(inputUndecidedMembers).parent().click()
        cy.data(failedAttendingMembers).should("be.visible")
      })

      it("should show text with explanation if no members for an attending status", () => {
        cy.intercept("/rest/v1/rpc/get_members_by_event", { body: [] })
        const noAttendingMembers = "no-attending-members"
        cy.get(inputPresentMembers).should("be.checked")
        cy.data(noAttendingMembers).should("be.visible").should("contain.text", "present")
        cy.get(inputAbsentMembers).parent().click()
        cy.data(noAttendingMembers).should("be.visible").should("contain.text", "absent")
        cy.get(inputUndecidedMembers).parent().click()
        cy.data(noAttendingMembers).should("be.visible").should("contain.text", "undecided")
      })
    })

    context("the comment button", () => {
      it("on load it should show loader & on click it should open the add comment overlay", () => {
        const interception = interceptIndefinitely(getCommentPath, { statusCode: 200, body: [] })
        cy.data(addCommentButtonLoader).should("exist")
        interception.sendResponse()
        cy.data(addCommentButtonLoader).should("not.exist")
        cy.data(addCommentButton).invoke("text").should("equal", "Add comment")
        cy.data(addCommentButton)
          .click()
          .then(() => {
            cy.data(addCommentOverlay).should("be.visible")
            cy.data(deleteCommentButton).should("not.be.visible")
          })
      })

      context("the overlay", () => {
        before(() => Cypress.Keyboard.defaults({ keystrokeDelay: 0 }))

        beforeEach(() => {
          cy.wait(500)
          cy.data(addCommentButton)
            .click()
            .then(() => cy.data(addCommentOverlay).should("exist"))
        })

        it("should close on click of x", () => {
          cy.data("close-comment-overlay").click()
          cy.data(addCommentOverlay).should("not.exist")
        })

        it("should show error if trying to save empty comment", () => {
          cy.data(inputComment).type("  ").blur({ force: true })
          cy.data("save-comment-button").click()
          cy.data("input-comment-error").should("contain.text", "Please enter text")
        })

        it("should show success toast and close on overlay if saving comment succeeds", () => {
          cy.intercept("POST", setCommentPath, { statusCode: 200, body: [] }).as("setComment")
          cy.data(inputComment).type("Saving")
          cy.intercept(getCommentPath, cy.spy().as("getComment"))
          cy.data("save-comment-button")
            .click()
            .then(() => {
              cy.get("@getComment").should("have.been.called")
              cy.get(".Toastify")
                .get("#1")
                .should("be.visible")
                .should("have.class", "Toastify__toast--success")
              cy.data(addCommentOverlay).should("not.exist")
            })
        })

        it("should show error toast and stay on overlay if saving comment fails", () => {
          cy.intercept("POST", setCommentPath, { statusCode: 401, body: [] })
          cy.data(inputComment).type("Error")
          cy.data("save-comment-button").click()
          cy.get(".Toastify")
            .get("#1")
            .should("be.visible")
            .should("have.class", "Toastify__toast--error")
          cy.data(addCommentOverlay).should("exist")
        })

        it("should show the loader while saving the comment", () => {
          const interception = interceptIndefinitely(setCommentPath, { statusCode: 200, body: [] })
          cy.data(inputComment).type("Loader")
          cy.data("save-comment-button").click()
          cy.data("comment-loader").should("exist")
          interception.sendResponse()
          cy.data("comment-loader").should("not.exist")
        })
      })
    })
  })

  context("on the specific event page, with existing comment", () => {
    beforeEach(() => {
      cy.intercept(getCommentPath, [{ comment: "late" }]).as("comment")
      cy.visit(path)
      cy.wait("@comment")
    })

    it("should display correspondingly if user has existing comment", () => {
      cy.data(addCommentButton).invoke("text").should("equal", "Edit comment")
      cy.data(addCommentButton)
        .click()
        .then(() => {
          cy.data(inputComment).invoke("val").should("equal", "late")
          cy.data(deleteCommentButton).should("be.visible")
        })
    })

    it("should show success toast and close on overlay if deleting comment succeeds", () => {
      cy.data(addCommentButton)
        .click()
        .then(() => {
          cy.intercept("POST", setCommentPath, { statusCode: 200 })
          cy.intercept(getCommentPath, [{ comment: null }]).as("getComment")
          cy.data(deleteCommentButton).click()
          cy.get(".Toastify")
            .get("#1")
            .should("be.visible")
            .should("have.class", "Toastify__toast--success")
          cy.data(addCommentOverlay).should("not.exist")
          cy.wait("@getComment")
          cy.data(addCommentButton).invoke("text").should("equal", "Add comment")
        })
    })
  })

  context("when deleting an event", () => {
    beforeEach(() => cy.visit(path))
    it("should show delete btn when admin", () => {
      cy.data("delete-event-btn").should("exist")
    })

    it("btn should  not be disabled when text is incorrect", () => {
      cy.data("delete-event-btn").click()
      cy.data("delete-event-continue-button").click()
      cy.data("input-delete-event").type("Brainstormborrel")
      cy.data("delete-event-final-button").should('not.be.disabled')
    })

    it("btn should be disabled when text is incorrect", () => {
      cy.data("delete-event-btn").click()
      cy.data("delete-event-continue-button").click()
      cy.data("input-delete-event").type("Brainstormborre")
      cy.data("delete-event-final-button").should('be.disabled')
    })


    it("should show toast when failing confirm when pressing on delete", () => {
      cy.data("delete-event-btn").click()
      cy.intercept("/rest/v1/event*", {
        statusCode: 500,
        body: { error: "error" },
      })
      cy.data("delete-event-continue-button").click()
      cy.data("input-delete-event").type("Brainstormborrel")
      cy.data("delete-event-final-button").click()
      cy.on("window:confirm", () => true);
      cy.get(".Toastify")
          .get("#1")
          .get(".Toastify__toast-body")
          .should("have.text", "We couldn't delete your event, try again later.")
    })
  })
})
