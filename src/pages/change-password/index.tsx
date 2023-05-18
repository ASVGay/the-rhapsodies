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
  // TODO Use react-hook-form for this for cleaner code
  const supabase = useSupabaseClient<Database>()
  const user = useUser()

  const [password, setPassword] = useState<string>("")
  const [name, setName] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>()

  const [errorText, setErrorText] = useState<string>("")
  const [showErrorText, setShowErrorText] = useState<boolean>(false)
  const router = useRouter()

  type Inputs = "userName" | "password" | "confirmPassword"

  interface FormDataItem {
    tag: Inputs
    type: string
    placeholder: string
    dataCy: string
    validationOptions: RegisterOptions
  }

  const setError = (errorText: string) => {
    setErrorText(errorText)
    setShowErrorText(true)
  }
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()

  const formData: FormDataItem[] = [
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
        minLength: { value: 6, message: "Password should be minimal 6 characters" },
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
      },
    },
  ]
  const submitNewPassword = async () => {
      console.log("HI")
    // if (password !== confirmPassword) {
    //   setError("Fill in equal passwords.")
    //   return
    // }
    // if (user) {
    //   const { data, error } = await supabase.auth.updateUser({ password })
    //   if (error) {
    //     // TODO Alert that change password failed, try again
    //     setError(error.message)
    //   } else if (data) {
    //     setNameAndFirstLoginFalse(supabase, user.id, name)
    //       .then((response) => {
    //         const { error } = response
    //         // TODO Error handling
    //         if (error) {
    //           setError(error.message)
    //         } else router.push("/")
    //       })
    //       .catch((error) => setError(error.message))
    //   }
    // }
  }

  useEffect(() => {


  }, [errors])
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
            {formData.map(({ dataCy, placeholder, validationOptions, tag, type }, index) => {
              return (
                <div className="w-full gap-6 flex flex-col" key={index}>
                  <input
                    className="w-full rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-moon-500 focus:bg-white focus:outline-none"
                    {...register(tag, validationOptions)}
                    type={type}
                    placeholder={placeholder}
                    data-cy={dataCy}
                  />
                  {errors[tag] && (
                    <ErrorPopup
                      dataCy={"error-popup-change-password"}
                      text={errors[tag]?.message?.toString()}
                      closePopup={() => {}}
                    />
                  )}
                </div>
              )
            })}
          </form>
          <MainButton
            dataCy={"submit-password-btn"}
            onClick={handleSubmit(submitNewPassword)}
            text={"Submit"}
          />
        </div>
      </div>
    </div>
  )
}

export default Index
