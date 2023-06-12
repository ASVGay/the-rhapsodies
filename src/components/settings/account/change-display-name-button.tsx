import React from "react"
import SettingsButton from "@/components/settings/controls/settings-button"
import { useRouter } from "next/router"

const ChangeDisplayNameButton = () => {
  const router = useRouter()
  const goToChangeDisplayName = () => router.push("/settings/change-display-name")
  return (
    <SettingsButton
      disabled={false}
      onClick={goToChangeDisplayName}
      text={"Change display name"}
      dataCy={"change-display-name-button"}
    />
  )
}

export default ChangeDisplayNameButton
