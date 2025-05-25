import React, { useEffect, useState } from "react"
import { notificationsAreSupported } from "@/helpers/pwa.helper"
import Toggle from "@/components/settings/controls/toggle"
import { AlertText } from "@/constants/notifications"
import { loadOneSignal } from "@/lib/onesignal"

const showPermissionInstructions = (result: NotificationPermission) => {
  if (result === "denied") {
    alert(AlertText.permissionDenied)
  } else if (result === "granted") {
    alert(AlertText.permissionGranted)
  }
}

interface EnableNotificationsToggleProps {
  hasNotificationPermission: boolean
  setHasNotificationPermission: React.Dispatch<boolean>
}

const EnableNotificationsToggle = ({
  hasNotificationPermission,
  setHasNotificationPermission,
}: EnableNotificationsToggleProps) => {
  const [renderContent, setRenderContent] = useState<boolean>(false)
  const [permission, setPermission] = useState<NotificationPermission>("default")

  const changeNotificationSetting = async () => {
    const OneSignal = await loadOneSignal()

    OneSignal.Notifications.requestPermission()
      .then(() => {
        const result = OneSignal.Notifications.permissionNative
        // If permission is same as before, refer user to settings to change permission
        if (result === permission) showPermissionInstructions(result)
        setHasNotificationPermission(result === "granted")
      })
      .catch((error: Error) => alert(error))
      .finally(() => {
        setPermission(OneSignal.Notifications.permissionNative)
      })
  }

  useEffect(() => {
    // Only show content once window has been defined (since that is necessary for notificationsAreSupported)
    setRenderContent(true)
  }, [])

  return (
    <>
      {renderContent && (
        <Toggle
          dataCy={"enable-notifications-toggle"}
          text={"Allow notifications on device"}
          checked={hasNotificationPermission}
          handleChange={changeNotificationSetting}
          disabled={!notificationsAreSupported()}
        />
      )}
    </>
  )
}

export default EnableNotificationsToggle
