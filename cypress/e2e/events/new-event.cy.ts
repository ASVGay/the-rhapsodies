
describe("Create events page", () => {
    beforeEach(() => {
        cy.login()
        cy.visit("events/new")
    })

    it("Should throw error when eventtype is empty", () => {
        cy.data("button-add-event").click()
        cy.data("input_eventtype_error").contains("The event type needs to be selected")
    })


    it("Should throw error when startdate is empty", () => {
        cy.data("button-add-event").click()
        cy.data("select-startDate-error").contains("The start time needs to be selected")
    })

    it("Should throw error when enddate is empty", () => {
        cy.data("button-add-event").click()
        cy.data("select-end-time-error").contains("The end time needs to be selected")
    })

    it("Should throw error when enddate is earlier than startdate", () => {
        cy.wait(500)
        cy.data("start-time-select").select("12:00")
        cy.data("end-time-select").select("11:00")
        cy.data("button-add-event").click()
        cy.data("select-end-time-error").contains("The end time needs to be later than the start time")

    })

    it("Should throw error when location is empty", () => {
        cy.data("button-add-event").click()
        cy.data("input-location-error").contains("Location is required")
    })

    context("When making a request", () => {
        beforeEach(() => {
            cy.wait(500)
            cy.data("start-time-select").select("10:00")
            cy.data("end-time-select").select("11:00")
            cy.data("event-type-select").select("Brainstormborrel")
            cy.data("input-location").type("Amsterdam")
        })

        it("Should show success toastr when adding event succesfully", () => {
            cy.intercept('POST', "rest/v1/event?select=*", {
                statusCode: 200,
                body: {
                    data: {
                        id: 0
                    }
                },
            })
            cy.data("button-add-event").click()
            cy.get(".Toastify")
                .get("#1")
                .should("be.visible")
                .should("have.class", "Toastify__toast--success")
        })

        it("should display correct error message when there are no events yet", () => {
            cy.intercept('POST', "rest/v1/event?select=*", {
                statusCode: 500,
            })
            cy.data("button-add-event").click()
            cy.get(".Toastify")
                .get("#1")
                .should("be.visible")
                .should("have.class", "Toastify__toast--error")

        })

    })
})
