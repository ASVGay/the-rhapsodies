describe("the forgot password page", () => {
  const inputEmail = "input-email"
  const buttonSubmit = "button-submit-email"
  const error = "input-email-error"
  beforeEach(() => {
    cy.visit("/forgot-password")
  })

  it("should go to homepage if logged in", () => {
    cy.login()
  })

  it("should go back to login on click", () => {
    cy.data("back-to-sign-in").click()
    cy.location("pathname").should("equal", "/sign-in")
  })

  it("should require a email before submit", () => {
    cy.data(error).should("not.exist")
    cy.data(buttonSubmit).click()
    cy.data(error).should("be.visible")
    cy.data(inputEmail).should("have.css", "outline-color", "rgb(248, 113, 113)")
  })

  it.only("should show error toast on error of request", () => {
    cy.data(inputEmail).type("test@email")
    const error = {
      code: 429,
      msg: "For security purposes, you can only request this once every 60 seconds",
    }
    cy.intercept("POST", "/auth/v1/recover", {
      statusCode: 429,
      body: { ...error },
    })
    cy.data(buttonSubmit).click()
    cy.get(".Toastify").get("#1").get(".Toastify__toast-body").should("have.text", error.msg)
  })
})
