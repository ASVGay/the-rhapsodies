import React, { useState } from "react"
import { notificationsAreSupported } from "@/helpers/pwa.helper"
import Toggle from "@/components/settings/controls/toggle"
import { AlertText } from "@/constants/notifications"

function showPermissionInstructions(result: NotificationPermission) {
  if (result === "denied") {
    alert(AlertText.permissionDenied)
  } else if (result === "granted") {
    alert(AlertText.permissionGranted)
  }
}

const EnableNotificationsToggle = () => {
  const [permissionChecked, setPermissionChecked] = useState<boolean>(
    notificationsAreSupported() ? Notification.permission === "granted" : false
  )

  const [permission, setPermission] = useState<NotificationPermission>(
    notificationsAreSupported() ? Notification.permission : "default"
  )

  const changeNotificationSetting = () => {
    Notification.requestPermission()
      .then((result) => {
        // If permission is same as before, refer user to settings to change permission
        if (result === permission) showPermissionInstructions(result)
        setPermissionChecked(result === "granted")
      })
      .catch((error) => alert(error))
      .finally(() => {
        setPermission(Notification.permission)
      })
  }

  return (
    <Toggle
      dataCy={"enable-notifications-toggle"}
      text={"Enable notifications"}
      checked={permissionChecked}
      handleChange={changeNotificationSetting}
      disabled={!notificationsAreSupported()}
    />
  )
}

export default EnableNotificationsToggle
