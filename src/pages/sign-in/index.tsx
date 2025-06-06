import React, { useEffect, useState } from "react"
import Image from "next/image"
import SignInTextField from "@/components/text-fields/sign-in-text-field"
import { useRouter } from "next/router"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { Database } from "@/types/database"
import ErrorMessage from "@/components/error/error-message"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { FormDataItem } from "@/interfaces/form-data-item"
import Link from "next/link"
import { toast } from "react-toastify"
import { AuthResponse } from "@supabase/supabase-js"

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

  useEffect(() => {
    watch(() => setErrorPopupText(""))
  }, [watch])

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(router.asPath.split("#")[1])
    toast.error(urlSearchParams.get("error_description"), { toastId: "error_description" })
  }, [router.asPath])

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

  const signIn: SubmitHandler<FieldValues> = ({ email, password }) => {
    supabase.auth.signInWithPassword({ email, password }).then((response: AuthResponse) => {
      const { error } = response
      if (error) {
        setErrorPopupText(error.message)
      } else router.push("/")
    })
  }

  return (
    <div className={"full-bg-moon-50"}>
      <div className={"auth-container"}>
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
        <form className={"flex flex-col gap-6"} onSubmit={handleSubmit(signIn)}>
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
                {errors[tag] && (
                  <ErrorMessage
                    dataCy={`${dataCy}-error`}
                    message={errors[tag]?.message?.toString()}
                  />
                )}
              </div>
            )
          })}
          <button className={"btn"} type={"submit"} data-cy={"sign-in-submit-btn"}>
            Sign in
          </button>
          {errorPopupText !== "" && (
            <ErrorMessage dataCy={"sign-in-err"} message={errorPopupText} />
          )}
        </form>
        <Link
          href={"/forgot-password"}
          className={"text-center text-sm text-gray-400"}
          data-cy={"forgot-password"}
        >
          Forgot password?
        </Link>
      </div>
    </div>
  )
}

export default Index
