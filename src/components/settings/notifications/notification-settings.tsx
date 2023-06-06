import React, { useEffect, useState } from "react"
import SettingsWrapper from "@/components/settings/settings-wrapper"
import { BellIcon } from "@heroicons/react/24/outline"
import EnableNotificationsToggle from "@/components/settings/notifications/enable-notifications-toggle"
import { notificationsAreSupported } from "@/helpers/pwa.helper"
import TestNotificationButton from "@/components/settings/notifications/test-notification-button"
import ReceiveNotificationsToggle from "@/components/settings/notifications/receive-notifications-toggle"

const NotificationSettings = () => {
  const [info, setInfo] = useState<string>("")
  const [hasNotificationPermission, setHasNotificationPermission] = useState<boolean>(
    notificationsAreSupported() ? Notification.permission === "granted" : false
  )
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false)

  useEffect(() => {
    // Only show content once window has been defined (since that is necessary for notificationsAreSupported)
    if (!notificationsAreSupported())
      setInfo(
        "You need to add this application to your home screen if you want to enable notifications."
      )
  }, [])

  return (
    <SettingsWrapper category={"Notifications"} icon={BellIcon}>
      <EnableNotificationsToggle
        hasNotificationPermission={hasNotificationPermission}
        setHasNotificationPermission={setHasNotificationPermission}
      />
      <small
        className={"block text-xs italic text-zinc-300"}
        data-cy={"info-notifications-not-supported"}
      >
        {info}
      </small>
      <ReceiveNotificationsToggle
        hasNotificationPermission={hasNotificationPermission}
        isSubscribed={isSubscribed}
        setIsSubscribed={setIsSubscribed}
      />
      <TestNotificationButton isSubscribed={isSubscribed} />
    </SettingsWrapper>
  )
}

export default NotificationSettings
