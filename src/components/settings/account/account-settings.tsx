import React from "react"
import SettingsWrapper from "@/components/settings/settings-wrapper"
import { UserCircleIcon } from "@heroicons/react/24/outline"
import SignOut from "@/components/settings/account/sign-out"
import ChangePasswordButton from "@/components/settings/account/change-password-button"

const AccountSettings = () => {
  return (
    <SettingsWrapper category={"Account"} icon={UserCircleIcon}>
      <ChangePasswordButton />
      <SignOut />
    </SettingsWrapper>
  )
}

export default AccountSettings
