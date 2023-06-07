import React from "react"
import SettingsButton from "@/components/settings/controls/settings-button"
import { useRouter } from "next/router"

const ChangePasswordButton = () => {
  const router = useRouter()
  const goToChangePassword = () => router.push("/settings/change-password")
  return (
    <SettingsButton
      disabled={false}
      onClick={goToChangePassword}
      text={"Change password"}
      dataCy={"change-password-button"}
    />
  )
}

export default ChangePasswordButton
