import React, { useState } from "react"
import SignInTextField from "@/components/text-fields/sign-in-text-field"
import MainButton from "@/components/buttons/main-button"
import ErrorPopup from "@/components/utils/error-popup"
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { Database } from "@/types/database"
import { setNameAndFirstLoginFalse } from "@/services/authentication.service"
import { useRouter } from "next/router"

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

  const setError = (errorText: string) => {
    setErrorText(errorText)
    setShowErrorText(true)
  }

  const submitNewPassword = async () => {
    if (!password) {
      setError("Please enter a password.")
      return
    }

    if (password.length < 6) {
      setError("Password should at least be 6 characters.")
      return
    }

    if (password !== confirmPassword) {
      setError("Fill in equal passwords.")
      return
    }

    if (name.length < 1) {
      setError("Please fill in a name.")
      return
    }

    if (user) {
      const { data, error } = await supabase.auth.updateUser({ password })
      if (error) {
        // TODO Alert that change password failed, try again
        setError(error.message)
      } else if (data) {
        setNameAndFirstLoginFalse(supabase, user.id, name)
          .then((response) => {
            const { error } = response
            // TODO Error handling
            if (error) {
              setError(error.message)
            } else router.push("/")
          })
          .catch((error) => setError(error.message))
      }
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

            <SignInTextField
              dataCy={"set-name-textfield"}
              placeholder={"Username"}
              type={"text"}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            />
          </div>

          <div className="w-full">
            <SignInTextField
              dataCy={"change-password-textfield"}
              placeholder={"Password"}
              type={"password"}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <SignInTextField
              dataCy={"change-password-confirm-textfield"}
              placeholder={"Confirm Password"}
              type={"password"}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setConfirmPassword(e.target.value)
              }
            />
          </div>
          {showErrorText && (
            <ErrorPopup
              dataCy={"error-popup-change-password"}
              text={errorText}
              closePopup={() => setShowErrorText(false)}
            />
          )}
          <MainButton dataCy={"submit-password-btn"} onClick={submitNewPassword} text={"Submit"} />
        </div>
      </div>
    </div>
  )
}

export default Index
