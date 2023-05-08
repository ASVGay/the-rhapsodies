import React from "react"
import SettingsWrapper from "@/components/settings/settings-wrapper/settings-wrapper"
import { BellIcon } from "@heroicons/react/24/outline"
import Toggle from "@/components/settings/toggle/toggle"

const NotificationSettings = () => {
  const changeNotificationSetting = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log(event)
    alert("Notifications is set to " + event.currentTarget.checked.toString())
  }

  return (
    <SettingsWrapper category={"Notifications"} icon={BellIcon}>
      <Toggle
        text={"Enable notifications"}
        handleChange={changeNotificationSetting}
      />
    </SettingsWrapper>
  )
}

export default NotificationSettings
