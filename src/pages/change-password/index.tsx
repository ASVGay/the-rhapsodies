import React, { useEffect, useState } from "react"
import SignInTextField from "@/components/text-fields/sign-in-text-field"
import MainButton from "@/components/buttons/main-button"
import ErrorPopup from "@/components/popups/error-popup"
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { Database } from "@/types/database"
import { setNameAndFirstLoginFalse } from "@/services/authentication.service"
import { useRouter } from "next/router"
import { RegisterOptions, useForm } from "react-hook-form"

const Index = () => {
  const supabase = useSupabaseClient<Database>()
  const user = useUser()
  const router = useRouter()
  const [errorMsg, setErrorMsg] = useState("")
  const [showError, setShowError] = useState(false)

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm()

  const password = watch("password")
  const name = watch("userName")

  type Inputs = "userName" | "password" | "confirmPassword"

  interface FormDataItem {
    tag: Inputs
    type: string
    placeholder: string
    dataCy: string
    validationOptions: RegisterOptions
  }

  const changePasswordFormData: FormDataItem[] = [
    {
      tag: "userName",
      type: "text",
      placeholder: "Username",
      dataCy: "set-name-textfield",
      validationOptions: { required: "Username is required" },
    },
    {
      tag: "password",
      type: "password",
      placeholder: "Password",
      dataCy: "change-password-textfield",
      validationOptions: {
        required: "Password is required",
        minLength: { value: 6, message: "Password should at least be 6 characters." },
      },
    },
    {
      tag: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      dataCy: "change-password-confirm-textfield",
      validationOptions: {
        required: "Confirm Password is required",
        minLength: { value: 6, message: "Password should be minimal 6 characters" },
        validate: (value) => value === password || "Passwords do not match",
      },
    },
  ]
  const submitNewPassword = async () => {
    if (!user) return

    const { data, error } = await supabase.auth.updateUser({ password })
    if (error) {
      console.log(error)
      setErrorMsg("Change password failed, try again")
      setShowError(true)
    } else if (data) {
      setNameAndFirstLoginFalse(supabase, user.id, name).then((response) => {
        const { error } = response
        if (error) {
          console.log(error)
          setErrorMsg("Something went wrong, try again")
          setShowError(true)
        } else router.push("/")
      })
    }
  }

  return (
    <div>
      <div className={"flex h-screen w-screen items-center justify-center bg-moon-50"}>
        <div
          className={
            "flex h-fit w-80 flex-col justify-between gap-6 rounded-lg bg-zinc-50 p-4 bg-blend-hard-light"
          }
        >
          <div className={"flex w-full flex-col justify-center gap-6"}>
            <span className={"w-fit font-semibold leading-8 text-black"}>
              In order to access the application you need to change your password and set your
              username.
            </span>
          </div>
          <form className={"flex flex-col gap-6"}>
            {changePasswordFormData.map(
              ({ dataCy, placeholder, validationOptions, tag, type }, index) => {
                return (
                  <div className="flex w-full flex-col gap-2" key={index}>
                    <input
                      className="w-full rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-moon-500 focus:bg-white focus:outline-none"
                      {...register(tag, validationOptions)}
                      type={type}
                      placeholder={placeholder}
                      data-cy={dataCy}
                    />
                    {errors[tag] && (
                      <span data-cy={`${dataCy}-error`} className={"text-xs text-red-600"}>
                        ⚠ {errors[tag]?.message?.toString()}
                      </span>
                    )}
                  </div>
                )
              }
            )}
            {showError &&
                <span data-cy={"submit-error"} className={"text-xs text-red-600"}>
                        ⚠ {errorMsg}
                      </span> }
            <MainButton
                dataCy={"submit-password-btn"}
                onClick={handleSubmit(submitNewPassword)}
                text={"Submit"}
            />
          </form>
        </div>
      </div>
    </div>
  )
}

export default Index
