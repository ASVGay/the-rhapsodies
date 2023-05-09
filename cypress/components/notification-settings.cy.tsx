import "@/styles/globals.css"
import NotificationSettings from "@/components/settings/notifications/notification-settings"

const React = require("React")
const toggle: string = "enable-notifications-toggle"
describe("<NotificationSettings />", () => {
  it("renders", () => {
    cy.mount(<NotificationSettings />)
  })

  context("when notifications are supported", () => {
    it("notifications should be supported by the browser", function () {
      cy.mount(<NotificationSettings />)
      cy.window().should("have.property", "Notification").should("be.a", "function")
    })

    it("should show alert if trying to disable notifications with permission granted", function () {
      cy.stub(window.Notification, "permission", "granted" as unknown as () => {})
      cy.stub(window.Notification, "requestPermission").resolves("granted")
      cy.mount(<NotificationSettings />)
      cy.data(toggle).get("label").click()
      cy.on("window:alert", (text) => {
        expect(text).to.contains("disable")
      })
    })

    it("should show alert if trying to enable notifications with permission denied", function () {
      cy.stub(window.Notification, "permission", "denied" as unknown as () => {})
      cy.stub(window.Notification, "requestPermission").resolves("denied")
      cy.mount(<NotificationSettings />)
      cy.data(toggle).get("label").click()
      cy.on("window:alert", (text) => {
        expect(text).to.contains("enable")
      })
    })

    function checkToggleStateBasedOnPermission(
      permission: NotificationPermission,
      toggleState: "be.checked" | "not.be.checked"
    ) {
      cy.stub(window.Notification, "requestPermission").resolves(permission)
      cy.mount(<NotificationSettings />)
      cy.data(toggle).get("input").should("not.be.checked")
      cy.data(toggle).get("label").click()
      cy.data(toggle).get("input").should(toggleState)
    }

    context("and permission needs to be asked", () => {
      beforeEach(() => {
        cy.stub(window.Notification, "permission", "default" as unknown as () => {})
      })

      it("should check the checkbox when permission is granted", function () {
        checkToggleStateBasedOnPermission("granted", "be.checked")
      })

      it("should not check the checkbox when permission is not given", function () {
        checkToggleStateBasedOnPermission("default", "not.be.checked")
      })

      it("should not check the checkbox when permission is denied", function () {
        checkToggleStateBasedOnPermission("denied", "not.be.checked")
      })
    })
  })

  context("when notifications are not supported", () => {
    it("should disable the enable notifications toggle and show info text", function () {
      delete window.Notification
      cy.mount(<NotificationSettings />)
      cy.data("info-notifications-not-supported").should("be.visible")
      cy.data(toggle).get("input").should("be.disabled")
    })
  })
})
