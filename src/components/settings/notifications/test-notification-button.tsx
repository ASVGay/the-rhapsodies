import React from "react"
import { toast } from "react-toastify"
import SettingsButton from "@/components/settings/controls/settings-button"
import { useUser } from "@supabase/auth-helpers-react"

interface TestNotificationButtonProps {
  isSubscribed: boolean
}

const TestNotificationButton = ({ isSubscribed }: TestNotificationButtonProps) => {
  const userId = useUser()?.id

  const sendTestNotification = () => {
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
        include_external_user_ids: [userId],
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong while sending your notification")
        }
        toast.success("Notification sent!")
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
