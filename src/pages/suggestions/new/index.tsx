import React from "react"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/router"

const NewSuggestion = () => {
  const router = useRouter()

  return (
    <div className={"page-wrapper"}>
      <div className={"flex justify-between"}>
        <div className={"page-header"}>New Suggestion</div>
        <XMarkIcon
          className={"h-8 w-8 cursor-pointer text-zinc-400 hover:text-red-500"}
          onClick={() => router.push("/suggestions")}
        />
      </div>
    </div>
  )
}

export default NewSuggestion
