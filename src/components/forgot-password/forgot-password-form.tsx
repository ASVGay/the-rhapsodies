import { useFormContext } from "react-hook-form"
import Image from "next/image"
import ErrorMessage from "@/components/error/error-message"
import { EnvelopeIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import React from "react"
import { resetPasswordForEmail } from "@/services/authentication.service"
import { useSupabaseClient } from "@supabase/auth-helpers-react"

export interface ForgotPasswordInputs {
  email: string
}

interface ForgotPasswordFormProps {
  setEmailIsSent: React.Dispatch<React.SetStateAction<boolean>>
}

export const ForgotPasswordForm = ({ setEmailIsSent }: ForgotPasswordFormProps) => {
  const supabase = useSupabaseClient()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useFormContext<ForgotPasswordInputs>()

  const resetPassword = async ({ email }: ForgotPasswordInputs) => {
    if (await resetPasswordForEmail(supabase, email)) setEmailIsSent(true)
  }

  return (
    <div className={"auth-container text-center"} data-cy={"request-link"}>
      <Image
        src={"/images/undraw-forgot-password.svg"}
        alt={"Person looking confused at password field"}
        width={0}
        height={0}
        style={{ width: "100%" }}
      />
      <span className={"text-xl font-semibold"}>Forgotten your password?</span>
      <p className={"text-zinc-400"}>
        {"Enter your email and we'll send you a link to reset your password."}
      </p>
      <form onSubmit={handleSubmit(resetPassword)}>
        <div className={"input-container"}>
          <label htmlFor="email" className="sr-only">
            Enter your email
          </label>
          {errors.email && (
            <ErrorMessage
              dataCy={"input-email-error"}
              message={"Please enter your email address"}
            />
          )}
          <div className="input">
            <input
              className={`bg-zinc-50 !p-2.5 ${errors.email && "error"}`}
              data-cy={"input-email"}
              type="email"
              placeholder="Email"
              {...register("email", { required: true })}
            />
            <span>
              <EnvelopeIcon />
            </span>
          </div>
        </div>
        <button
          data-cy={"button-submit-email"}
          type={"submit"}
          className={"btn w-full rounded-lg p-2.5"}
        >
          Send link
        </button>
      </form>
      <Link
        href={"/sign-in"}
        className={"text-center text-sm text-gray-400"}
        data-cy={"back-to-sign-in"}
      >
        Back to login
      </Link>
    </div>
  )
}
