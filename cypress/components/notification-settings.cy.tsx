import "@/styles/globals.css"
import NotificationSettings from "@/components/settings/notifications/notification-settings"

const React = require("React")

describe("<NotificationSettings />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<NotificationSettings />)
  })
})
