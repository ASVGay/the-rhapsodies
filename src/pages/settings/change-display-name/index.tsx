import React from "react"
import { ArrowLeftIcon } from "@heroicons/react/24/outline"
import ChangeDisplayNameForm from "@/components/settings/account/change-display-name/change-display-name-form"
import { useRouter } from "next/router"

const Index = () => {
  const router = useRouter()

  return (
    <div className={"page-wrapper lg:w-3/5"}>
      <h1 className={"page-header flex items-center lg:justify-between lg:text-center"}>
        <ArrowLeftIcon
          data-cy={"back-to-settings"}
          className={"mr-2 h-8 cursor-pointer hover:text-moon"}
          onClick={() => router.push("/settings")}
        />
        Set display name
        {/*Empty span to center text on lg screen*/}
        <span />
      </h1>
      <ChangeDisplayNameForm />
    </div>
  )
}

export default Index
