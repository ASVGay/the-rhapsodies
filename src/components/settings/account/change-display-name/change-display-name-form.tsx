import React, { useState } from "react"
import CurrentDisplayName from "@/components/settings/account/change-display-name/current-display-name"
import ErrorMessage from "@/components/error/error-message"
import { UserCircleIcon } from "@heroicons/react/24/outline"
import CurrentPasswordInput from "@/components/settings/account/current-password-input"
import SpinnerStripes from "@/components/utils/spinner-stripes"
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { Database } from "@/types/database"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { updateDisplayName, verifyPassword } from "@/services/authentication.service"
import { toast } from "react-toastify"
import { handleNoUser, showIncorrectPassword } from "@/helpers/account-settings"

interface FormInputs {
  newDisplayName: string
  currentPassword: string
}

const updateDisplayNameError = () =>
  toast.error("Something went wrong while changing your display name. Please try again.")

const ChangeDisplayNameForm = () => {
  const uid = useUser()?.id
  const supabase = useSupabaseClient<Database>()
  const router = useRouter()
  const [isUpdatingName, setIsUpdatingName] = useState<boolean>(false)

  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm<FormInputs>()
  const updateNewDisplayName = async (newDisplayName: string, uid: string) => {
    const { data, error } = await updateDisplayName(supabase, newDisplayName.trim(), uid)

    if (error) updateDisplayNameError()
    else if (data) {
      toast.success(`Display name successfully changed to ${data.display_name}!`)
      await router.push("/settings")
    }
  }

  const submitNewDisplayName = async ({ currentPassword, newDisplayName }: FormInputs) => {
    setIsUpdatingName(true)
    if (!uid) {
      handleNoUser(supabase, router)
      setIsUpdatingName(false)
    } else {
      verifyPassword(supabase, currentPassword).then(async ({ error, data }) => {
        if (error) updateDisplayNameError()
        // check if verify password returns true (correct password)
        if (data) await updateNewDisplayName(newDisplayName, uid)
        // deep check that data returns false and not null or undefined
        if (data === false) showIncorrectPassword(setError)

        setIsUpdatingName(false)
      })
    }
  }

  return (
    <form
      className={"flex flex-col gap-4"}
      onSubmit={handleSubmit(submitNewDisplayName)}
      data-cy={"change-display-name-form"}
    >
      <CurrentDisplayName />
      <p>
        Please enter your <b>new</b> display name.
      </p>
      <div className={"input-container"}>
        <label htmlFor="newDisplayName" className="sr-only">
          Enter your new display name
        </label>
        {errors.newDisplayName && (
          <ErrorMessage
            dataCy={"input-new-display-name-error"}
            message="Please provide a display name"
          />
        )}
        <div className="input">
          <input
            className={`!p-2.5 !pe-12 ${errors.newDisplayName && "error"}`}
            data-cy={"input-new-display-name"}
            type="text"
            placeholder="New display name"
            {...register("newDisplayName", {
              validate: (value) => {
                return !!value.trim()
              },
            })}
            disabled={isUpdatingName}
          />
          <span>
            <UserCircleIcon />
          </span>
        </div>
      </div>

      <p>Please enter your password to verify your identity.</p>
      <CurrentPasswordInput
        errors={errors}
        register={register("currentPassword", {
          required: { value: true, message: "Please provide your current password" },
        })}
        disabled={isUpdatingName}
      />

      <button
        data-cy={"button-submit-new-display-name"}
        type={"submit"}
        className={"btn flex w-full justify-center gap-2 rounded-lg p-2.5"}
        disabled={isUpdatingName}
      >
        {isUpdatingName ? <SpinnerStripes dataCy={"spinner"} /> : "Update name"}
      </button>
    </form>
  )
}

export default ChangeDisplayNameForm
