import React, { useCallback, useEffect, useState } from "react"
import Toggle from "@/components/settings/controls/toggle"
import OneSignal from "react-onesignal"
import { toast } from "react-toastify"

interface ReceiveNotificationsToggleProps {
  isSubscribed: boolean
  setIsSubscribed: React.Dispatch<boolean>
  hasNotificationPermission: boolean
}

const ReceiveNotificationsToggle = ({
  isSubscribed,
  setIsSubscribed,
  hasNotificationPermission,
}: ReceiveNotificationsToggleProps) => {
  const [renderContent, setRenderContent] = useState<boolean>(false)

  const getSubscriptionStatus = useCallback(() => {
    OneSignal.isPushNotificationsEnabled()
      .then((isEnabled) => setIsSubscribed(isEnabled))
      .catch((error) => {
        toast.error("Something went wrong while retrieving your notification data")
        console.error(error)
      })
  }, [setIsSubscribed])

  const changeSubscription = () => {
    OneSignal.setSubscription(!isSubscribed)
      .then(() => getSubscriptionStatus())
      .catch((error) => {
        toast.error("Something went wrong while retrieving your notification data")
        console.error(error)
      })
  }

  useEffect(() => {
    // Only show content once window has been defined (since that is necessary for notificationsAreSupported)
    setRenderContent(true)
    getSubscriptionStatus()
  }, [getSubscriptionStatus])

  return (
    <>
      {renderContent && (
        <Toggle
          dataCy={"receive-notifications-toggle"}
          text={"Receive notifications"}
          checked={isSubscribed}
          handleChange={changeSubscription}
          disabled={!hasNotificationPermission}
        />
      )}
    </>
  )
}

export default ReceiveNotificationsToggle
