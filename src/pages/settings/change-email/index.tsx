import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { Database } from "@/types/database"
import React, { useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { ArrowLeftIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import ChangeEmailForm from "@/components/settings/account/change-email/change-email-form"
import ChangeEmailConfirmation from "@/components/settings/account/change-email/change-email-confirmation"

export interface ChangeEmailInputs {
  newEmailAddress: string
  currentPassword: string
}

const Index = () => {
  const [emailIsSent, setEmailIsSent] = useState<boolean>(false)
  const router = useRouter()
  const supabase = useSupabaseClient<Database>()

  useEffect(() => {
    const hash = (router.asPath as string).split("#")[1]
    const parsedHash = new URLSearchParams(hash)
    const refreshToken = parsedHash.get("refresh_token")
    const error = parsedHash.get("error")
    if (error) router.push("/sign-in")
    if (refreshToken)
      supabase.auth.refreshSession({ refresh_token: refreshToken }).then(() => {
        toast.success(`Your email has successfully been updated!`, {
          toastId: "update-success",
        })
        history.pushState("", document.title, window.location.pathname)
      })
  })

  const methods = useForm<ChangeEmailInputs>()

  return (
    <div className={"page-wrapper lg:w-3/5"}>
      <h1 className={"page-header flex items-center lg:justify-between lg:text-center"}>
        <ArrowLeftIcon
          data-cy={"back-to-settings"}
          className={"mr-2 h-8 cursor-pointer hover:text-moon"}
          onClick={() => router.push("/settings")}
        />
        Change email
        {/*Empty span to center text on lg screen*/}
        <span />
      </h1>

      <FormProvider {...methods}>
        {emailIsSent ? (
          <ChangeEmailConfirmation setEmailIsSent={setEmailIsSent} />
        ) : (
          <ChangeEmailForm setEmailIsSent={setEmailIsSent} />
        )}
      </FormProvider>
    </div>
  )
}

export default Index
