import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { Database } from "@/types/database"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import ErrorMessage from "@/components/error/error-message"
import { ArrowLeftIcon, EnvelopeIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import { sendChangeEmailRequest, verifyPassword } from "@/services/authentication.service"
import SpinnerStripes from "@/components/utils/spinner-stripes"
import { handleNoUser, showIncorrectPassword } from "@/helpers/account-settings"
import CurrentPasswordInput from "@/components/settings/account/current-password-input"

interface FormInputs {
  newEmailAddress: string
  currentPassword: string
}

const updateEmailError = () =>
  toast.error("Something went wrong while changing your email address. Please try again.")

const Index = () => {
  const user = useUser()
  const supabase = useSupabaseClient<Database>()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)

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

  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm<FormInputs>()

  const sendChangeEmail = async (email: string) => {
    const isEmailSent = await sendChangeEmailRequest(supabase, email)

    if (isEmailSent) {
      // TODO don't redirect but show user instructions
      toast.success(`Email is sent!`)
      await router.push("/settings")
    }
  }

  const submitNewEmail = async ({ currentPassword, newEmailAddress }: FormInputs) => {
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

      <form
        className={"flex flex-col gap-4 text-zinc-400"}
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
              className={`!p-2.5 !pe-12 ${errors.newEmailAddress && "error"}`}
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

        <button
          data-cy={"button-submit-new-email"}
          type={"submit"}
          className={"btn flex w-full justify-center gap-2 rounded-lg p-2.5"}
          disabled={isLoading}
        >
          {isLoading ? <SpinnerStripes dataCy={"spinner"} /> : "Update email"}
        </button>
      </form>
    </div>
  )
}

export default Index
