import React from "react"
import SettingsWrapper from "@/components/settings/settings-wrapper"
import { UserCircleIcon } from "@heroicons/react/24/outline"
import SignOut from "@/components/settings/account/sign-out"
import ChangePasswordButton from "@/components/settings/account/change-password-button"
import ChangeDisplayNameButton from "@/components/settings/account/change-display-name-button"

const AccountSettings = () => {
  return (
    <SettingsWrapper category={"Account"} icon={UserCircleIcon}>
      <ChangeDisplayNameButton />
      <ChangePasswordButton />
      <SignOut />
    </SettingsWrapper>
  )
}

export default AccountSettings
