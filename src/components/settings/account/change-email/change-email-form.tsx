import React, { useState } from "react"
import ErrorMessage from "@/components/error/error-message"
import { EnvelopeIcon } from "@heroicons/react/24/outline"
import CurrentPasswordInput from "@/components/settings/account/current-password-input"
import SpinnerStripes from "@/components/utils/spinner-stripes"
import { handleNoUser, showIncorrectPassword } from "@/helpers/account-settings"
import { sendChangeEmailRequest, verifyPassword } from "@/services/authentication.service"
import { ChangeEmailInputs } from "@/pages/settings/change-email"
import { useFormContext } from "react-hook-form"
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { Database } from "@/types/database"
import { useRouter } from "next/router"
import { toast } from "react-toastify"

interface ChangeEmailFormProps {
  setEmailIsSent: React.Dispatch<React.SetStateAction<boolean>>
}

const ChangeEmailForm = ({ setEmailIsSent }: ChangeEmailFormProps) => {
  const updateEmailError = () =>
    toast.error("Something went wrong while changing your email address. Please try again.")

  const user = useUser()
  const supabase = useSupabaseClient<Database>()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useFormContext<ChangeEmailInputs>()

  const sendChangeEmail = async (email: string) => {
    const emailIsSent = await sendChangeEmailRequest(supabase, email)
    if (emailIsSent) setEmailIsSent(true)
  }

  const submitNewEmail = async ({ currentPassword, newEmailAddress }: ChangeEmailInputs) => {
    setIsLoading(true)
    if (!user) {
      handleNoUser(supabase, router)
      setIsLoading(false)
    } else {
      verifyPassword(supabase, currentPassword).then(async ({ error, data }) => {
        if (error) updateEmailError()
        // check if verify password returns true (correct password)
        if (data) await sendChangeEmail(newEmailAddress)
        // deep check that data returns false and not null or undefined
        if (data === false) showIncorrectPassword(setError)

        setIsLoading(false)
      })
    }
  }

  return (
    <form
      className={"flex flex-col gap-4"}
      onSubmit={handleSubmit(submitNewEmail)}
      data-cy={"change-email-form"}
    >
      {user?.email ? (
        <p data-cy={"current-email"}>
          Your email address is currently{" "}
          <span className={"font-bold text-moon"}>{user.email}</span>.
        </p>
      ) : (
        <p className={"text-xs italic"} data-cy={"error-current-email"}>
          Your current email could not be retrieved. Try opening this setting again if you want to
          view it.
        </p>
      )}

      <p>
        Please enter your <b>new</b> email address.
      </p>
      <div className={"input-container"}>
        <label htmlFor="newEmail" className="sr-only">
          Enter your new email address
        </label>
        {errors.newEmailAddress && (
          <ErrorMessage
            dataCy={"input-new-email-error"}
            message="Please provide an email address"
          />
        )}
        <div className="input">
          <input
            className={`p-2.5! pe-12! ${errors.newEmailAddress && "error"}`}
            data-cy={"input-new-email"}
            type="email"
            placeholder="New email address"
            required
            {...register("newEmailAddress", {
              required: true,
            })}
            disabled={isLoading}
          />
          <span>
            <EnvelopeIcon />
          </span>
        </div>
      </div>

      <p>Please enter your password to verify your identity.</p>
      <CurrentPasswordInput
        errors={errors}
        register={register("currentPassword", {
          required: { value: true, message: "Please provide your current password" },
        })}
        disabled={isLoading}
      />

      <button data-cy={"button-submit-new-email"} className={"btn submit"} disabled={isLoading}>
        {isLoading ? <SpinnerStripes dataCy={"spinner"} /> : "Update email"}
      </button>
    </form>
  )
}

export default ChangeEmailForm
