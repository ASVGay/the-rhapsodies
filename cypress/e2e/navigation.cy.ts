const topNavigation: string = "top"
const bottomNavigation: string = "bottom"

type NavigationItem = { path: string; data: string }

const pages: NavigationItem[] = [
  { path: "/", data: "home" },
  // {path: "/repertoire", data: "repertoire"},
  { path: "/suggestions", data: "suggestions" },
  // {path: "/events", data: "events"},
  { path: "/settings", data: "settings" },
]
describe("navigation components", () => {
  context("when logged out", () => {
    before(() => {
      cy.logout()
      cy.visit("/")
    })

    it("should not render navigation on devices with a width of >=1024", () => {
      cy.viewport(1024, 768)
      cy.data(topNavigation).should("not.exist")
      cy.data(bottomNavigation).should("not.exist")
    })

    it("should not render bottom navigation on devices with a width of <1024", () => {
      cy.viewport(768, 1024)
      cy.data(topNavigation).should("not.exist")
      cy.data(bottomNavigation).should("not.exist")
    })
  })

  context("when logged in", () => {
    beforeEach(() => {
      cy.login()
    })

    it("should show 404 page when going to an unknown route", () => {
      cy.visit("/random-route", { failOnStatusCode: false })
      cy.data("404-page").should("be.visible")
    })

    context("on devices with a width of >=1024", () => {
      beforeEach(() => {
        cy.viewport(1024, 768)
      })

      it("should render top navigation", () => {
        cy.visit("/")
        cy.data(topNavigation).should("be.visible")
        cy.data(bottomNavigation).should("not.be.visible")
      })

      it("should be able to navigate to all pages", () => {
        cy.visit("/")
        cy.data(topNavigation).within(() => {
          pages.forEach((page) => {
            cy.data(page.data).click()
            cy.location("pathname").should("equal", page.path)
          })
        })
      })
    })

    context("on devices with a width of <1024", () => {
      beforeEach(() => {
        cy.viewport(768, 1024)
      })

      it("should render bottom navigation", () => {
        cy.visit("/")
        cy.data(topNavigation).should("not.be.visible")
        cy.data(bottomNavigation).should("be.visible")
      })

      it("should be able to navigate to all pages", () => {
        cy.visit("/")
        cy.data(bottomNavigation).within(() => {
          pages.forEach((page) => {
            cy.data(page.data).click()
            cy.location("pathname").should("equal", page.path)
          })
        })
      })
    })
  })
})
