import React from "react"
import SettingsWrapper from "@/components/settings/settings-wrapper"
import { UserCircleIcon } from "@heroicons/react/24/outline"
import SignOut from "@/components/settings/account/sign-out"

const Account = () => {
  return (
    <SettingsWrapper category={"Account"} icon={UserCircleIcon}>
      <SignOut />
    </SettingsWrapper>
  )
}

export default Account
