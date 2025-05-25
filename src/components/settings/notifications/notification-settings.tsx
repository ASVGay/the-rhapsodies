import React, { useEffect, useState } from "react"
import SettingsWrapper from "@/components/settings/settings-wrapper"
import { BellIcon, InformationCircleIcon } from "@heroicons/react/24/outline"
import EnableNotificationsToggle from "@/components/settings/notifications/enable-notifications-toggle"
import { notificationsAreSupported } from "@/helpers/pwa.helper"
import TestNotificationButton from "@/components/settings/notifications/test-notification-button"
import ReceiveNotificationsToggle from "@/components/settings/notifications/receive-notifications-toggle"
import { useRouter } from "next/router"
import { loadOneSignal } from "@/lib/onesignal"

const NotificationSettings = () => {
  const router = useRouter()
  const [info, setInfo] = useState<string>("")
  const [hasNotificationPermission, setHasNotificationPermission] = useState<boolean>(
    notificationsAreSupported() ? Notification.permission === "granted" : false,
  )
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false)
  const [hasAdBlock, setHasAdBlock] = useState<boolean>(false)
  const [hasSubscriptionId, setHasSubscriptionId] = useState<boolean>(false)

  useEffect(() => {
    // Only show content once window has been defined (since that is necessary for notificationsAreSupported)
    if (!notificationsAreSupported()) {
      setInfo(
        "You need to add this application to your home screen if you want to enable notifications.",
      )
    }
  }, [])

  const checkForAdblock = async () => {
    const OneSignal = await loadOneSignal()
    setTimeout(function () {
      fetch(
        `https://onesignal.com/api/v1/sync/${process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID}/web?callback=__jp0`,
      )
        .catch(() => {
          setHasAdBlock(true)
        })
        .finally(() => {
          // Check if the user is subscribed after the request has been made to make sure
          // that OneSignal is loaded by then
          setHasSubscriptionId(OneSignal.User?.PushSubscription?.id !== undefined)
        })
    }, 1000) // Delay to make sure the request is not blocked by the browser
  }

  checkForAdblock()

  return (
    <SettingsWrapper category={"Notifications"} icon={BellIcon}>
      {hasAdBlock && (
        <span className={"inline-flex items-center text-sm text-zinc-400"}>
          <InformationCircleIcon className={"mr-1 h-4"} />
          Please disable your ad-blocker for the notification settings to work.
        </span>
      )}
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
      <small
        className={"block text-sm italic text-zinc-300 underline cursor-pointer"}
        data-cy={"info-notifications-not-supported"}
        onClick={() => router.reload()}
      >
        {hasNotificationPermission &&
          !hasSubscriptionId &&
          "⚠ Notification settings might not work properly. Click here to fix this. Contact an admin if the problem persists. ⚠"}
      </small>
    </SettingsWrapper>
  )
}

export default NotificationSettings
