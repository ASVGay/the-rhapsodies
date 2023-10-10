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
    const isSubscribed = OneSignal.User.PushSubscription.optedIn
    if (isSubscribed !== undefined) {
      setIsSubscribed(isSubscribed)
    } else {
      toast.error("Something went wrong while retrieving your notification data")
    }
  }, [setIsSubscribed])

  const changeSubscription = () => {
    isSubscribed
      ? OneSignal.User.PushSubscription.optOut()
          .then(() => getSubscriptionStatus())
          .catch((error) => {
            toast.error("Something went wrong while retrieving your notification data")
            console.error(error)
          })
      : OneSignal.User.PushSubscription.optIn()
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
