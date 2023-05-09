import React from "react"
import SettingsWrapper from "@/components/settings/settings-wrapper"
import { BellIcon } from "@heroicons/react/24/outline"
import EnableNotificationsToggle from "@/components/settings/notifications/enable-notifications-toggle"
import { notificationsAreSupported } from "@/helpers/pwa.helper"

const NotificationSettings = () => {
  return (
    <SettingsWrapper category={"Notifications"} icon={BellIcon}>
      <EnableNotificationsToggle />
      {!notificationsAreSupported() && (
        <small className={"block italic text-zinc-300"}>
          You need to add this application to your home screen if you want to enable notifications.
        </small>
      )}
    </SettingsWrapper>
  )
}

export default NotificationSettings
