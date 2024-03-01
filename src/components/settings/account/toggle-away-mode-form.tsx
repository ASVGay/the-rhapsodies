import React, { useState } from "react"
import Image from "next/image"
import Toggle from "@/components/settings/controls/toggle"
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { toast } from "react-toastify"
import { Database } from "@/types/database"
import { hideUser } from "@/services/authentication.service"
import { useRouter } from "next/router"

const ToggleAwayModeForm = () => {
  const userId = useUser()?.id
  const supabase = useSupabaseClient<Database>()
  const router = useRouter()
  const [enabled, setEnabled] = useState<boolean>(false)
  const errorToast = () => {
    toast.error("Failed to enable Away Mode. Try logging in again if the problem persists.", {
      toastId: "away-mode-error",
    })
  }

  const enableAwayMode = async () => {
    if (!userId) return errorToast()

    hideUser(supabase, userId).then(({ error }) => {
      if (error) return errorToast()

      setEnabled(true)
      router.push("/away-mode-enabled").then(() => {
        toast.success("Away Mode enabled. You are now invisible in the app.", {
          toastId: "away-mode-enabled",
        })
      })
    })
  }

  return (
    <div className={"flex flex-col gap-4 items-center"}>
      <p className={"lg:text-center"}>
        <span className={"font-bold text-moon"}>Away Mode</span> enables you to become invisible in
        the app. When enabled, your presence will not be reflected in the song repertoire,
        suggestions, or event attendance lists. Use this feature if you are temporarily stepping
        away from the Rhapsodies but intend to return later.
      </p>
      <br />
      <Image
        src={"/images/undraw-travel-mode.svg"}
        alt={"Open envelope with checkmark"}
        className={"animate-fade-right animate-once"}
        width={0}
        height={0}
        style={{ width: "50%" }}
      />
      <br />
      <Toggle
        text={"Enable Away Mode"}
        handleChange={() => enableAwayMode()}
        checked={enabled}
        dataCy={"away-mode-toggle"}
        disabled={false}
      />
    </div>
  )
}

export default ToggleAwayModeForm
