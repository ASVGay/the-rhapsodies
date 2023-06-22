const icons8Link = "https://icons8.com"

describe("the settings page", () => {
  const accountSettingsPages = [
    {
      name: "change display name",
      button: "change-display-name-button",
      path: "/settings/change-display-name",
    },
    {
      name: "change email",
      button: "change-email-button",
      path: "/settings/change-email",
    },
    {
      name: "change password",
      button: "change-password-button",
      path: "/settings/change-password",
    },
  ]

  beforeEach(() => {
    cy.login()
    cy.visit("/settings")
  })

  it("should somewhere contain a link to Icons  8", () => {
    cy.get("a[href]").each(($el) => {
      cy.wrap($el.attr("href")).should("include", icons8Link)
    })
  })

  accountSettingsPages.forEach((page) => {
    it(`should go to the ${page.name} page`, () => {
      cy.data(page.button).click()
      cy.location("pathname").should("eq", page.path)
    })
  })

  it("should open the terms and conditions overlay", () => {
    cy.data("terms-conditions-button").click()
    cy.data("terms-and-conditions").should("exist")
  })

  it("should open the privacy policy overlay", () => {
    cy.data("privacy-policy-button").click()
    cy.data("privacy-policy").should("exist")
  })
})
