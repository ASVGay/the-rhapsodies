import React from "react"
import { toast } from "react-toastify"
import SettingsButton from "@/components/settings/controls/settings-button"
import { loadOneSignal } from "@/lib/onesignal"

interface TestNotificationButtonProps {
  isSubscribed: boolean
}

const TestNotificationButton = ({ isSubscribed }: TestNotificationButtonProps) => {
  const sendTestNotification = async () => {
    const OneSignal = await loadOneSignal()

    fetch(`https://onesignal.com/api/v1/notifications`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${process.env.NEXT_PUBLIC_ONESIGNAL_REST_API_KEY}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        app_id: process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID,
        contents: { en: "This is a test notification!" },
        name: "Test notification",
        include_subscription_ids: [OneSignal.User.PushSubscription.id],
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong while sending your notification")
        }

        res
          .json()
          .then((data) => {
            if (data.errors) {
              console.error("Error sending notification")
              console.error(data.errors)
              throw new Error("Something went wrong while sending your notification")
            }
            toast.success("Notification sent!")
          })
          .catch(() => {
            toast.error("Something went wrong while sending your notification")
          })
      })
      .catch(() => {
        toast.error("Something went wrong while sending your notification")
      })
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
