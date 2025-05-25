import React, { useCallback, useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useUser } from "@supabase/auth-helpers-react"
import Toggle from "@/components/settings/controls/toggle"
import { OneSignalContext } from "@/pages/_app"
import { loadOneSignal } from "@/lib/onesignal"

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
  const oneSignalInitialized = useContext(OneSignalContext)
  const [renderContent, setRenderContent] = useState<boolean>(false)
  const userId = useUser()?.id

  const getSubscriptionStatus = useCallback(async () => {
    const OneSignal = await loadOneSignal()
    setIsSubscribed(OneSignal.User.PushSubscription.optedIn === true)
  }, [setIsSubscribed])

  useEffect(() => {
    const manageSubscription = async () => {
      const OneSignal = await loadOneSignal()
      if (userId && oneSignalInitialized) {
        console.log("Logging in to OneSignal")
        OneSignal.login(userId)
          .then(() => getSubscriptionStatus())
          .catch(() => console.error("Error logging in to OneSignal"))
      } else {
        console.log("Logging out of OneSignal")
        OneSignal.logout()
          .then(() => getSubscriptionStatus())
          .catch(() => console.error("Error logging out of OneSignal"))
      }
    }
    manageSubscription()
  }, [getSubscriptionStatus, oneSignalInitialized, userId])

  const handleSubscribingError = () => {
    toast.error("Something went wrong while subscribing to notifications. Please try again later.")
    getSubscriptionStatus()
  }

  const changeSubscription = async () => {
    const OneSignal = await loadOneSignal()
    if (isSubscribed) {
      OneSignal.User.PushSubscription.optOut().then(() => {
        toast.success(
          "Unsubscribed from notifications! It might take a couple of seconds to take effect.",
        )
        getSubscriptionStatus()
      })
    } else if (userId) {
      OneSignal.login(userId)
        .then(() => {
          OneSignal.User.PushSubscription.optIn().then(() => {
            toast.success(
              "Subscribed to notifications! It might take a couple of seconds to take effect.",
            )
            getSubscriptionStatus()
          })
        })
        .catch(() => handleSubscribingError())
    } else {
      handleSubscribingError()
    }
  }

  useEffect(() => {
    // Only show content once window has been defined (since that is necessary for notificationsAreSupported)
    setRenderContent(true)
    getSubscriptionStatus()
  }, [getSubscriptionStatus])

  return (
    <>
      {renderContent && (
        // <div className="onesignal-customlink-container"></div>
        <Toggle
          dataCy={"receive-notifications-toggle"}
          text={"Subscribe to notifications"}
          checked={isSubscribed}
          handleChange={changeSubscription}
          disabled={!hasNotificationPermission}
        />
      )}
    </>
  )
}

export default ReceiveNotificationsToggle
