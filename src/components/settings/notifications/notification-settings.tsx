import React from "react"
import SettingsWrapper from "@/components/settings/settings-wrapper"
import { BellIcon } from "@heroicons/react/24/outline"
import EnableNotificationsToggle from "@/components/settings/notifications/enable-notifications-toggle"

const NotificationSettings = () => {
  return (
    <SettingsWrapper category={"Notifications"} icon={BellIcon}>
      <EnableNotificationsToggle />
    </SettingsWrapper>
  )
}

export default NotificationSettings
