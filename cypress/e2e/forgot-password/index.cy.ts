describe("the forgot password page", () => {
  // -------------------------------------------------------------- Variables
  const inputEmail = "input-email"
  const buttonSubmit = "button-submit-email"
  const error = "input-email-error"
  const checkYourMail = "check-your-mail"
  const requestLink = "request-link"
  const tryAgain = "try-again"
  const backToSignIn = "back-to-sign-in"
  const testEmail = "em@il"
  const emailValue = "email-value"
  const successMessage = "An email has been sent. Check your spam folder if you cannot find it."
  const errorBodyForgotPassword = {
    statusCode: 429,
    body: {
      ...{
        code: 429,
        msg: "For security purposes, you can only request this once every 60 seconds",
      },
    },
  }

  // -------------------------------------------------------------- Tests
  beforeEach(() => {
    cy.intercept("POST", "/auth/v1/recover*", {
      statusCode: 200,
      body: {},
    }).as("link-request")
    cy.logout()
    cy.visit("/forgot-password")
  })

  it("should go to homepage if logged in", () => {
    cy.login()
    cy.visit("/forgot-password")
    cy.location("pathname").should("equal", "/")
  })

  it("should render request password area", () => {
    cy.data(checkYourMail).should("not.exist")
    cy.data(requestLink).should("be.visible")
    cy.data(inputEmail).should("be.visible")
    cy.data(buttonSubmit).should("be.visible")
  })

  it("should go back to login on click", () => {
    cy.data(backToSignIn).click()
    cy.location("pathname").should("equal", "/sign-in")
  })

  it("should require an email before submit", () => {
    cy.data(error).should("not.exist")
    cy.data(buttonSubmit).click()
    cy.data(error).should("be.visible")
    cy.data(inputEmail).should("have.css", "outline-color", "rgb(248, 113, 113)")
  })

  it("should show error toast on error of request", () => {
    cy.data(inputEmail).type(testEmail)
    cy.intercept("POST", "/auth/v1/recover*", errorBodyForgotPassword)
    cy.data(buttonSubmit).click()
    cy.get(".Toastify").get("#1").get(".Toastify__toast-body").should(
      "have.text",
      {
        code: 429,
        msg: "For security purposes, you can only request this once every 60 seconds",
      }.msg,
    )
  })

  context("on submit", () => {
    beforeEach("submit email", () => {
      cy.data(inputEmail).type(testEmail)
      cy.data(buttonSubmit).click()
    })

    it("should render check your email area", () => {
      cy.data(requestLink).should("not.exist")
      cy.data(tryAgain).should("be.visible")
      cy.data(backToSignIn).should("be.visible")
      cy.data(emailValue).should("be.visible")
    })

    it("should display submitted email", () => {
      cy.data(emailValue).should("contain.text", testEmail)
    })

    it("should go back to login on click", () => {
      cy.data(backToSignIn).click()
      cy.location("pathname").should("equal", "/sign-in")
    })

    it("should re-request link with correct email on try again", () => {
      cy.data(tryAgain).click()
      cy.wait("@link-request").its("request.body.email").should("include", testEmail)
    })

    it("should show toast on succes of try again", () => {
      cy.data(tryAgain).click()
      cy.wait("@link-request")
      cy.get(".Toastify").get("#1").get(".Toastify__toast-body").should("have.text", successMessage)
    })

    it("should show toast on error of try again", () => {
      cy.intercept("POST", "/auth/v1/recover*", errorBodyForgotPassword).as("link-request")
      cy.data(tryAgain).click()
      cy.wait("@link-request")
      cy.get(".Toastify").get("#1").get(".Toastify__toast-body").should(
        "have.text",
        {
          code: 429,
          msg: "For security purposes, you can only request this once every 60 seconds",
        }.msg,
      )
    })
  })
})
