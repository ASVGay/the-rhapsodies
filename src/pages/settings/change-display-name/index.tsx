import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { Database } from "@/types/database"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import ErrorMessage from "@/components/error/error-message"
import { ArrowLeftIcon, UserCircleIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import {
  getDisplayName,
  updateDisplayName,
  verifyPassword,
} from "@/services/authentication.service"
import SpinnerStripes from "@/components/utils/spinner-stripes"
import { handleNoUser, showIncorrectPassword } from "@/helpers/account-settings"
import Spinner from "@/components/utils/spinner"
import CurrentPasswordInput from "@/components/settings/account/current-password-input"

interface FormInputs {
  newDisplayName: string
  currentPassword: string
}

const updateDisplayNameError = () =>
  toast.error("Something went wrong while changing your display name. Please try again.")

const Index = () => {
  const uid = useUser()?.id
  const supabase = useSupabaseClient<Database>()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [isLoadingDisplayName, setIsLoadingDisplayName] = useState<boolean>(false)
  const [displayName, setDisplayName] = useState<string>("")
  const hasSuccessfullyLoadedDisplayName = !isLoadingDisplayName && displayName
  const hasFailedLoadingDisplayName = !isLoadingDisplayName && !displayName

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
    setIsLoading(true)
    if (!uid) {
      handleNoUser(supabase, router)
      setIsLoading(false)
    } else {
      verifyPassword(supabase, currentPassword).then(async ({ error, data }) => {
        if (error) updateDisplayNameError()
        // check if verify password returns true (correct password)
        if (data) await updateNewDisplayName(newDisplayName, uid)
        // deep check that data returns false and not null or undefined
        if (data === false) showIncorrectPassword(setError)

        setIsLoading(false)
      })
    }
  }

  useEffect(() => {
    const retrieveCurrentDisplayName = () => {
      setIsLoadingDisplayName(true)
      if (uid) {
        getDisplayName(supabase, uid).then(({ data, error }) => {
          if (error) setDisplayName("")
          if (data) setDisplayName(data.display_name)
          setIsLoadingDisplayName(false)
        })
      }
    }

    retrieveCurrentDisplayName()
  }, [uid, supabase, router])

  return (
    <div className={"page-wrapper lg:w-3/5"}>
      <h1 className={"page-header flex items-center lg:justify-between lg:text-center"}>
        <ArrowLeftIcon
          data-cy={"back-to-settings"}
          className={"mr-2 h-8 cursor-pointer hover:text-moon"}
          onClick={() => router.push("/settings")}
        />
        Change name
        {/*Empty span to center text on lg screen*/}
        <span />
      </h1>

      <form
        className={"flex flex-col gap-4 text-zinc-400"}
        onSubmit={handleSubmit(submitNewDisplayName)}
        data-cy={"change-display-name-form"}
      >
        {isLoadingDisplayName && <Spinner size={6} dataCy={"spinner-display-name"} />}
        {hasSuccessfullyLoadedDisplayName && (
          <p data-cy={"current-display-name"}>
            Your current display name is{" "}
            <span className={"font-bold text-moon"}>{displayName}</span>.
          </p>
        )}
        {hasFailedLoadingDisplayName && (
          <p className={"text-xs italic"} data-cy={"error-current-display-name"}>
            Your current display name could not be retrieved. Try opening this setting again if you
            want to view it.
          </p>
        )}

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
              disabled={isLoading}
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
          disabled={isLoading}
        />

        <button
          data-cy={"button-submit-new-display-name"}
          type={"submit"}
          className={"btn flex w-full justify-center gap-2 rounded-lg p-2.5"}
          disabled={isLoading}
        >
          {isLoading ? <SpinnerStripes dataCy={"spinner"} /> : "Update name"}
        </button>
      </form>
    </div>
  )
}

export default Index
