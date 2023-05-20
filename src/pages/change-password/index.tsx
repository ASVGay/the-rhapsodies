import React, { useState } from "react"
import SignInTextField from "@/components/text-fields/sign-in-text-field"
import MainButton from "@/components/buttons/main-button"
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { Database } from "@/types/database"
import { setNameAndFirstLoginFalse } from "@/services/authentication.service"
import { useRouter } from "next/router"
import { RegisterOptions, useForm } from "react-hook-form"
import ErrorMsg from "@/components/error/error-message"
import {ChangePasswordInputs, SignInInputs} from "@/types/form-types";

export interface FormDataItem {
  tag: ChangePasswordInputs | SignInInputs
  type: string
  placeholder: string
  dataCy: string
  validationOptions: RegisterOptions
}
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
      setErrorMsg("Change password failed, try again")
      setShowError(true)
    } else if (data) {
      setNameAndFirstLoginFalse(supabase, user.id, name).then((response) => {
        const { error } = response
        if (error) {
          setErrorMsg("Something went wrong, try again")
          setShowError(true)
        } else router.push("/")
      }).catch(() => {
            setErrorMsg("Something went wrong, try again")
            setShowError(true)
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
              ({ dataCy, placeholder, validationOptions, tag, type }) => {
                return (
                  <div className="flex w-full flex-col gap-2" key={tag}>
                    <SignInTextField
                      tag={tag}
                      validationOptions={validationOptions}
                      register={register}
                      type={type}
                      placeholder={placeholder}
                      dataCy={dataCy}
                    />
                    {errors[tag] && <ErrorMsg dataCy={`${dataCy}-error`} message={errors[tag]?.message?.toString()} />}
                  </div>
                )
              }
            )}
            {showError && <ErrorMsg dataCy={"submit-password-err"} message={errorMsg} />}
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
