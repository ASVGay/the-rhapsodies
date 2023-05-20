import React, {useEffect, useState} from "react"
import SignInTextField from "@/components/text-fields/sign-in-text-field"
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { Database } from "@/types/database"
import {setName} from "@/services/authentication.service"
import { useRouter } from "next/router"
import {FieldValues, SubmitHandler, useForm} from "react-hook-form"
import {FormDataItem} from "@/interfaces/formdata";
import ErrorMessage from "@/components/error/error-message";

const Index = () => {
  const supabase = useSupabaseClient<Database>()
  const user = useUser()
  const router = useRouter()
  const [errorMsg, setErrorMsg] = useState("")
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    watch(() => setErrorMsg(""))
  }, [watch])

  const password = watch("password")

  const changePasswordFormData: FormDataItem[] = [
    {
      tag: "name",
      type: "text",
      placeholder: "Name",
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
        validate: (value) => value === password || "Passwords do not match",
      },
    },
  ]
  const submitNewPassword: SubmitHandler<FieldValues> = async ({name, password}) => {
    if (!user) return
    const { data, error } = await supabase.auth.updateUser({ password })

    if (error) {
      setErrorMsg("Change password failed, try again")
    } else if (data) {
      setName(supabase, user.id, name).then((response) => {
        const { error } = response
        if (error) {
          setErrorMsg("Something went wrong, try again")
        } else router.push("/")
      }).catch(() => {
            setErrorMsg("Something went wrong, try again")
          })
    }
  }

  return <div>
    <div className={"flex h-screen w-screen items-center justify-center bg-moon-50"}>
      <div
        className={
          "flex h-fit w-80 flex-col justify-between gap-6 rounded-lg bg-zinc-50 p-4 bg-blend-hard-light"
        }
      >
        <div className={"flex w-full flex-col justify-center gap-6"}>
          <span className={"w-fit font-semibold leading-8 text-black"}>
             Welcome to the application of The Rhapsodies! Please give us your name and change your password.
          </span>
        </div>
        <form
            className={"flex flex-col gap-6"}
            onSubmit={handleSubmit(submitNewPassword)}
        >
          {changePasswordFormData.map(
            ({ dataCy, placeholder, validationOptions, tag, type }) => {
              return <div className="flex w-full flex-col gap-2" key={tag}>
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
            }
          )}
          <button
              className="rounded bg-moon-500 px-4 py-2 font-bold text-white hover:bg-moon-300"
              data-cy={"submit-password-btn"}
          >
            Submit
          </button>
          {errorMsg !== "" && <ErrorMessage dataCy={"submit-password-err"} message={errorMsg} />}
        </form>
      </div>
    </div>
  </div>
}

export default Index
