import React from "react"
import SettingsWrapper from "@/components/settings/settings-wrapper"
import { UserCircleIcon } from "@heroicons/react/24/outline"
import SignOut from "@/components/settings/account/sign-out"
import SettingsButton from "@/components/settings/controls/settings-button"
import { useRouter } from "next/router"

const AccountSettings = () => {
  const router = useRouter()

  return (
    <SettingsWrapper category={"Account"} icon={UserCircleIcon}>
      <SettingsButton
        disabled={false}
        onClick={async () => await router.push("/settings/change-display-name")}
        text={"Set display name"}
        dataCy={"change-display-name-button"}
      />
      <SettingsButton
        disabled={false}
        onClick={async () => await router.push("/settings/change-email")}
        text={"Update email address"}
        dataCy={"change-email-button"}
      />
      <SettingsButton
        disabled={false}
        onClick={async () => await router.push("/settings/change-password")}
        text={"Change password"}
        dataCy={"change-password-button"}
      />
      <SettingsButton
        disabled={false}
        onClick={async () => await router.push("/settings/away-mode")}
        text={"Toggle Away Mode"}
        dataCy={"away-mode-button"}
      />
      <SignOut />
    </SettingsWrapper>
  )
}

export default AccountSettings
