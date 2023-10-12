import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { Database } from "@/types/database"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import ErrorMessage from "@/components/error/error-message"
import { ArrowLeftIcon, LockClosedIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import { verifyPassword } from "@/services/authentication.service"
import SpinnerStripes from "@/components/utils/spinner-stripes"
import { handleNoUser, showIncorrectPassword } from "@/helpers/account-settings"
import CurrentPasswordInput from "@/components/settings/account/current-password-input"

interface FormInputs {
  currentPassword: string
  newPassword: string
  confirmationPassword: string
}

const updatePasswordError = () =>
  toast.error("Something went wrong while changing your password. Please try again.")

const Index = () => {
  const user = useUser()
  const supabase = useSupabaseClient<Database>()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
    setError,
  } = useForm<FormInputs>()

  const updatePassword = async (newPassword: string) => {
    const { error } = await supabase.auth.updateUser({ password: newPassword })

    if (error) {
      if (error.message.includes("New password should be different from the old password")) {
        toast.error(
          "Your new password must be different from your old password. Please try again with a different password.",
        )
      } else {
        updatePasswordError()
      }
    } else {
      toast.success("Password successfully changed!")
      await router.push("/settings")
    }
  }

  const submitNewPassword = async ({ currentPassword, newPassword }: FormInputs) => {
    setIsLoading(true)
    if (!user) {
      handleNoUser(supabase, router)
      setIsLoading(false)
    } else {
      verifyPassword(supabase, currentPassword).then(async ({ error, data }) => {
        if (error) updatePasswordError()
        // check if verify password returns true (correct password)
        if (data) await updatePassword(newPassword)
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
        Change Password
        {/*Empty span to center text on lg screen*/}
        <span />
      </h1>

      <form
        className={"flex flex-col gap-4"}
        onSubmit={handleSubmit(submitNewPassword)}
        data-cy={"change-password-form"}
      >
        <p>
          Please enter your <b>current</b> password.
        </p>
        <CurrentPasswordInput
          errors={errors}
          register={register("currentPassword", {
            required: { value: true, message: "Please provide your current password" },
          })}
          disabled={isLoading}
        />

        <p>
          Please enter your <b>new</b> password.
        </p>
        <div className={"input-container mb-0"}>
          <label htmlFor="newPassword" className="sr-only">
            Enter your new password
          </label>
          {errors.newPassword && (
            <ErrorMessage
              dataCy={"input-new-password-error"}
              message={errors.newPassword.message}
            />
          )}
          <div className="input">
            <input
              className={`!p-2.5 !pe-12 ${errors.newPassword && "error"}`}
              data-cy={"input-new-password"}
              type="password"
              placeholder="New password"
              {...register("newPassword", {
                required: { value: true, message: "Please provide a password" },
                minLength: { value: 6, message: "Your password must be at least six characters" },
              })}
              disabled={isLoading}
            />
            <span>
              <LockClosedIcon />
            </span>
          </div>
        </div>

        <div className={"input-container"}>
          <label htmlFor="confirmationPassword" className="sr-only">
            Confirm your new password
          </label>
          {errors.confirmationPassword && (
            <ErrorMessage
              dataCy={"input-confirmation-password-error"}
              message={errors.confirmationPassword?.message}
            />
          )}
          <div className="input">
            <input
              className={`!p-2.5 !pe-12 ${errors.confirmationPassword && "error"}`}
              data-cy={"input-confirmation-password"}
              type="password"
              placeholder="Confirm your new password"
              {...register("confirmationPassword", {
                required: "Please provide your password",
                validate: (value) => value === watch("newPassword") || "Passwords do not match",
              })}
              disabled={isLoading}
            />
            <span>
              <LockClosedIcon />
            </span>
          </div>
        </div>
        <button
          data-cy={"button-submit-new-password"}
          className={"btn submit"}
          disabled={isLoading}
        >
          {isLoading ? <SpinnerStripes dataCy={"spinner"} /> : "Change password"}
        </button>
      </form>
    </div>
  )
}

export default Index
