import Image from "next/image"
import Link from "next/link"
import React from "react"
import { toast } from "react-toastify"
import { resetPasswordForEmail } from "@/services/authentication.service"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useFormContext } from "react-hook-form"
import { ForgotPasswordInputs } from "@/components/forgot-password/forgot-password-form"

export function ForgotPasswordConfirmation() {
  const supabase = useSupabaseClient()
  const { watch } = useFormContext<ForgotPasswordInputs>()
  const emailAddress = watch("email")

  const resendEmail = async () => {
    const isSuccess = await resetPasswordForEmail(supabase, emailAddress)
    if (isSuccess)
      toast.success("An email has been sent. Check your spam folder if you cannot find it.")
  }

  return (
    <div className={"auth-container text-center"} data-cy={"check-your-mail"}>
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
        If an user with this email exists, you will receive an email with a link to reset your
        password.
      </p>
      <div className={"flex justify-between"}>
        <div
          className={"text-center text-sm text-moon-500"}
          data-cy={"try-again"}
          onClick={resendEmail}
        >
          Try again
        </div>
        <Link
          href={"/sign-in"}
          className={"text-center text-sm text-gray-400"}
          data-cy={"back-to-sign-in"}
        >
          Back to login
        </Link>
      </div>
    </div>
  )
}
