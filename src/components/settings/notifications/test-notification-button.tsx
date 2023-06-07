import React from "react"
import { toast } from "react-toastify"
import SettingsButton from "@/components/settings/controls/settings-button"

interface TestNotificationButtonProps {
  isSubscribed: boolean
}

const TestNotificationButton = ({ isSubscribed }: TestNotificationButtonProps) => {
  const sendTestNotification = () => {
    if (typeof window !== "undefined") {
      // @ts-ignore
      window.OneSignal.sendSelfNotification(
        /* Title (defaults if unset) */
        "The Rhapsodies",
        /* Message (defaults if unset) */
        "This is a test notification!",
        /* URL (defaults if unset) */
        window.location.origin,
        /* Icon */
        "https://onesignal.com/images/notification_logo.png"
      )
      toast.success("Notification sent!")
    }
  }

  return (
    <SettingsButton
      onClick={sendTestNotification}
      text={"Send a test notification"}
      dataCy={"button-test-notification"}
      disabled={!isSubscribed}
    />
  )
}

export default TestNotificationButton
