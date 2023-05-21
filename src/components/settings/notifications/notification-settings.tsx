import React, { useEffect, useState } from "react"
import SettingsWrapper from "@/components/settings/settings-wrapper"
import { BellIcon } from "@heroicons/react/24/outline"
import EnableNotificationsToggle from "@/components/settings/notifications/enable-notifications-toggle"
import { notificationsAreSupported } from "@/helpers/pwa.helper"

const NotificationSettings = () => {
  const [info, setInfo] = useState<string>("")

  useEffect(() => {
    // Only show content once window has been defined (since that is necessary for notificationsAreSupported)
    if (!notificationsAreSupported())
      setInfo(
        "You need to add this application to your home screen if you want to enable notifications."
      )
  }, [])
  return (
    <SettingsWrapper category={"Notifications"} icon={BellIcon}>
      <EnableNotificationsToggle />
      <small
        className={"block text-xs italic text-zinc-300"}
        data-cy={"info-notifications-not-supported"}
      >
        {info}
      </small>
    </SettingsWrapper>
  )
}

export default NotificationSettings
