import React from "react"
import ErrorMessage from "@/components/error/error-message"
import { useForm } from "react-hook-form"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import { LockClosedIcon } from "@heroicons/react/24/outline"

interface FormInputs {
  password: string
  confirmationPassword: string
}

const Index = () => {
  const supabase = useSupabaseClient()
  const router = useRouter()

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<FormInputs>({ shouldFocusError: false })
  const updatePassword = async ({ password }: FormInputs) => {
    const { error } = await supabase.auth.updateUser({ password })
    if (error) toast.error(error.message)
    else {
      await router.push("/")
      toast.success("Password successfully updated!")
    }
  }

  return (
    <div className={"full-bg-moon-50"}>
      <div className="auth-container text-center">
        <span className={"text-xl font-semibold"}>Create a new password</span>
        <p className={"text-zinc-400"}>Your password must be at least six characters.</p>
        <form onSubmit={handleSubmit(updatePassword)}>
          <div className={"input-container"}>
            <label htmlFor="password" className="sr-only">
              Enter your new password
            </label>
            {errors.password && (
              <ErrorMessage dataCy={"input-password-error"} message={errors.password.message} />
            )}
            <div className="input">
              <input
                className={`bg-zinc-50 p-2.5! pe-12! ${errors.password && "error"}`}
                data-cy={"input-password"}
                type="password"
                placeholder="New password"
                {...register("password", {
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
            <label htmlFor="confirmation-password" className="sr-only">
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
                className={`bg-zinc-50 p-2.5! pe-12! ${errors.confirmationPassword && "error"}`}
                data-cy={"input-confirmation-password"}
                type="password"
                placeholder="Confirm your new password"
                {...register("confirmationPassword", {
                  required: "Please provide your password",
                  validate: (value) => value === watch("password") || "Passwords do not match",
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
            Reset your password
          </button>
        </form>
      </div>
    </div>
  )
}

export default Index
