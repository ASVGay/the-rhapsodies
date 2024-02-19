import React from "react"
import { ArrowLeftIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/router"
import ToggleAwayModeForm from "@/components/settings/account/toggle-away-mode-form"

interface AwayModeProps {}

const AwayMode = (props: AwayModeProps) => {
  const router = useRouter()

  return (
    <div className={"page-wrapper lg:w-3/5"}>
      <h1 className={"page-header flex items-center lg:justify-between lg:text-center"}>
        <ArrowLeftIcon
          data-cy={"back-to-settings"}
          className={"mr-2 h-8 cursor-pointer hover:text-moon"}
          onClick={() => router.push("/settings")}
        />
        Toggle Away Mode
        {/*Empty span to center text on lg screen*/}
        <span />
      </h1>
      <ToggleAwayModeForm />
    </div>
  )
}

export default AwayMode
