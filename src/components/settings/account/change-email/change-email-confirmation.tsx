import React from "react"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useFormContext } from "react-hook-form"
import { sendChangeEmailRequest } from "@/services/authentication.service"
import { toast } from "react-toastify"
import { ChangeEmailInputs } from "@/pages/settings/change-email"
import Image from "next/image"

interface ChangeEmailConfirmationProps {
  setEmailIsSent: React.Dispatch<React.SetStateAction<boolean>>
}

const ChangeEmailConfirmation = ({ setEmailIsSent }: ChangeEmailConfirmationProps) => {
  const supabase = useSupabaseClient()
  const { watch } = useFormContext<ChangeEmailInputs>()
  const emailAddress = watch("newEmailAddress")

  const resendEmail = async () => {
    const emailIsSent = await sendChangeEmailRequest(supabase, emailAddress)
    if (emailIsSent) {
      toast.success("An email has been sent. Check your spam folder if you cannot find it.")
    }
  }

  return (
    <div
      className={"flex h-[80vh] items-center justify-center"}
      data-cy={"change-email-confirmation"}
    >
      <div className={"flex h-fit w-80 flex-col justify-between gap-6 p-4 text-center"}>
        <Image
          src={"/images/undraw-mail-sent.svg"}
          alt={"Open envelope with checkmark"}
          className={"animate-fade-down animate-once"}
          width={0}
          height={0}
          style={{ width: "100%" }}
        />
        <span className={"text-xl font-semibold"}>Check your email</span>
        <span className={"text-sm"}>
          Email sent to: <b data-cy={"email-value"}>{emailAddress}</b>
        </span>
        <p className={"text-zinc-700"}>
          Please verify your new email address by clicking on the link in the email.
        </p>

        <div className={"flex justify-between"}>
          <div
            className={"cursor-pointer text-center text-sm text-moon-500"}
            data-cy={"resend-email"}
            onClick={resendEmail}
          >
            Resend email
          </div>
          <div
            onClick={() => setEmailIsSent(false)}
            className={"cursor-pointer text-center text-sm text-gray-400"}
            data-cy={"edit-email"}
          >
            Edit email
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChangeEmailConfirmation
