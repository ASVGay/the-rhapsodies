import React, { useState } from "react"
import Image from "next/image"
import SignInTextField from "@/components/text-fields/sign-in-text-field"
import { useRouter } from "next/router"
import MainButton from "@/components/buttons/main-button"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { Database } from "@/types/database"
import { AuthResponse } from "@supabase/gotrue-js"
import ErrorMessage from "@/components/error/error-message"
import { FormDataItem } from "@/pages/change-password"
import { useForm } from "react-hook-form"

const Index = () => {
  const [errorPopupText, setErrorPopupText] = useState<string>("")
  const supabase = useSupabaseClient<Database>()
  const router = useRouter()
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm()

  const email = watch("email")
  const password = watch("password")

  const signInFormData: FormDataItem[] = [
    {
      tag: "email",
      type: "email",
      placeholder: "Email",
      dataCy: "sign-in-email",
      validationOptions: {
        required: "Email is required",
      },
    },
    {
      tag: "password",
      type: "password",
      placeholder: "Password",
      dataCy: "sign-in-password",
      validationOptions: {
        required: "Password is required",
      },
    },
  ]

  const signIn = () => {
    supabase.auth.signInWithPassword({ email, password }).then((response: AuthResponse) => {
      const { error } = response
      if (error) {
        setErrorPopupText(error.message)
      } else {
        router.push("/")
      }
    })
  }

  return (
    <div className={"flex h-screen w-screen items-center justify-center bg-moon-50"}>
      <div
        className={
          "flex h-fit w-80 flex-col justify-between gap-6 rounded-lg bg-zinc-50 p-4 bg-blend-hard-light"
        }
      >
        <div className={"flex w-full justify-center"}>
          <Image
            height={150}
            width={150}
            alt={"Logo Rhapsodies"}
            src={"/images/circle_logo.png"}
            style={{ width: "150px", height: "150px" }}
          />
        </div>
        <div className={"flex w-full justify-center"}>
          <span className={"w-fit font-semibold leading-8 text-black"}>
            Sign in to your account
          </span>
        </div>
        {signInFormData.map(({ dataCy, placeholder, validationOptions, tag, type }) => {
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
              {errors[tag] && <ErrorMessage dataCy={`${dataCy}-error`} message={errors[tag]?.message?.toString()} />}
            </div>
          )
        })}
        {errorPopupText !== "" && <ErrorMessage dataCy={"sign-in-err"} message={errorPopupText} />}
        <MainButton onClick={handleSubmit(signIn)} text={"Sign in"} dataCy={"sign-in-submit-btn"} />
      </div>
    </div>
  )
}

export default Index
