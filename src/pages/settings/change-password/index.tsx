import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { Database } from "@/types/database"
import React from "react"
import { useForm } from "react-hook-form"
import ErrorMessage from "@/components/error/error-message"
import { LockClosedIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/router"
import { toast } from "react-toastify"

interface FormInputs {
  currentPassword: string
  newPassword: string
  confirmationPassword: string
}

const signOutError = () => toast.error("Something went wrong while logging out.")

const Index = () => {
  const user = useUser()
  const supabase = useSupabaseClient<Database>()
  const router = useRouter()

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<FormInputs>()

  const signOut = () => {
    toast.error("Something went wrong. Please login again")
    supabase.auth
      .signOut()
      .then(async (response) => {
        if (response.error) signOutError()
        else await router.push("/sign-in")
      })
      .catch(() => signOutError)
  }

  const submitNewPassword = async ({ newPassword }: FormInputs) => {
    if (!user) {
      await signOut()
      return
    }

    const confirmed = window.confirm("Are you sure you want to change your password?")
    if (!confirmed) return

    const { error } = await supabase.auth.updateUser({ password: newPassword })

    if (error) {
      toast.error("Something went wrong while changing your password. Try again.")
    } else {
      toast.success("Password successfully changed!")
      await router.push("/settings")
    }
  }
  return (
    <div className={"page-wrapper lg:w-3/5"}>
      <h1 className={"page-header lg:text-center"}>Change Password</h1>

      <form
        className={"flex flex-col gap-4 text-zinc-400"}
        onSubmit={handleSubmit(submitNewPassword)}
      >
        <p>
          Please enter your <b>current</b> password.
        </p>
        <div className={"input-container"}>
          <label htmlFor="currentPassword" className="sr-only">
            Enter your current password
          </label>
          {errors.currentPassword && (
            <ErrorMessage
              dataCy={"input-current-password-error"}
              message={errors.currentPassword.message}
            />
          )}
          <div className="input">
            <input
              className={`!p-2.5 !pe-12 ${errors.currentPassword && "error"}`}
              data-cy={"input-current-password"}
              type="password"
              placeholder="Current password"
              {...register("currentPassword", {
                required: { value: true, message: "Please provide your current password" },
              })}
            />
            <span>
              <LockClosedIcon />
            </span>
          </div>
        </div>

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
            />
            <span>
              <LockClosedIcon />
            </span>
          </div>
        </div>
        <button
          data-cy={"button-submit-new-password"}
          type={"submit"}
          className={"btn w-full rounded-lg p-2.5"}
        >
          Change password
        </button>
      </form>
    </div>
  )
}

export default Index
