import "@/styles/globals.css"
import NotificationSettings from "@/components/settings/notifications/notification-settings"

const React = require("React")
const enableNotificationsToggle: string = "enable-notifications-toggle"
describe("<NotificationSettings />", () => {
  const checkToggleStateBasedOnPermission = (
    permission: NotificationPermission,
    toggleState: "be.checked" | "not.be.checked"
  ) => {
    cy.stub(window.Notification, "requestPermission").resolves(permission)
    cy.mount(<NotificationSettings />)
    cy.data(enableNotificationsToggle).within(() => cy.get("input").should("not.be.checked"))
    cy.data(enableNotificationsToggle).within(() => cy.get("label").click())
    cy.data(enableNotificationsToggle).within(() => cy.get("input").should(toggleState))
  }

  it("renders", () => {
    cy.mount(<NotificationSettings />)
  })

  context("when notifications are supported", () => {
    it("notifications should be supported by the browser", () => {
      cy.mount(<NotificationSettings />)
      cy.window().should("have.property", "Notification").should("be.a", "function")
    })

    it("should show alert if trying to disable notifications with permission granted", () => {
      cy.stub(window.Notification, "permission", "granted" as unknown as () => {})
      cy.stub(window.Notification, "requestPermission").resolves("granted")
      cy.mount(<NotificationSettings />)
      cy.data(enableNotificationsToggle).within(() => cy.get("label").click())
      cy.on("window:alert", (text) => {
        expect(text).to.contains("disable")
      })
    })

    it("should show alert if trying to enable notifications with permission denied", () => {
      cy.stub(window.Notification, "permission", "denied" as unknown as () => {})
      cy.stub(window.Notification, "requestPermission").resolves("denied")
      cy.mount(<NotificationSettings />)
      cy.data(enableNotificationsToggle).within(() => cy.get("label").click())
      cy.on("window:alert", (text) => {
        expect(text).to.contains("enable")
      })
    })
  })

  context("when notifications are not supported", () => {
    it("should disable the enable notifications toggle and show info text", () => {
      delete window.Notification
      cy.mount(<NotificationSettings />)
      cy.data("info-notifications-not-supported").should("be.visible")
      cy.data(enableNotificationsToggle).get("input").should("be.disabled")
    })
  })
})
