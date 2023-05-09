import React, { useState } from "react"
import SignInTextField from "@/components/text-fields/sign-in-text-field"
import MainButton from "@/components/buttons/main-button"
import { useAuthContext } from "@/context/auth-context"
import ErrorPopup from "@/components/popups/error-popup"
import { mapAuthErrorCodeToErrorMessage } from "@/helpers/sign-in.helper"
import { FirebaseError } from "@firebase/util"
import WithProtectedRoute from "@/components/protected-route/protected-route"
import { changePassword, signOutUser } from "@/services/authentication.service"
import { ErrorCodes } from "@/constants/error-codes"

const Index = () => {
  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>()
  const [errorText, setErrorText] = useState<string>("")
  const [showErrorText, setShowErrorText] = useState<boolean>(false)
  const { user } = useAuthContext()
  const submitNewPassword = async () => {
    if (!password) {
      return
    }

    if (!user) {
      return
    }

    if (password !== confirmPassword) {
      setErrorText("Fill in equal passwords.")
      setShowErrorText(true)
      return
    }

    try {
      await changePassword(password, user.user)
    } catch (error) {
      const err = error as FirebaseError
      setErrorText(mapAuthErrorCodeToErrorMessage(err.code))
      if (err.code === ErrorCodes.REQUIRE_RECENT_LOGIN) {
        setTimeout(() => {
          signOutUser()
        }, 5000)
      }
      setShowErrorText(true)
    }
  }

  return (
    <div>
      <div
        className={
          "flex h-screen w-screen items-center justify-center bg-moon-50"
        }
      >
        <div
          className={
            "flex h-fit w-80 flex-col justify-between gap-6 rounded-lg bg-zinc-50 p-4 bg-blend-hard-light"
          }
        >
          {user?.additionalUserData.isFirstLogin && (
            <div className={"flex w-full justify-center"}>
              <span className={"w-fit font-semibold leading-8 text-black"}>
                In order to access the application you need to change your
                password.
              </span>
            </div>
          )}

          <div className="w-full">
            <SignInTextField
              placeholder={"Password"}
              type={"password"}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
          </div>
          <div>
            <SignInTextField
              placeholder={"Confirm Password"}
              type={"password"}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setConfirmPassword(e.target.value)
              }
            />
          </div>
          {showErrorText && (
            <ErrorPopup
              text={errorText}
              closePopup={() => setShowErrorText(false)}
            />
          )}
          <MainButton onClick={submitNewPassword} text={"Submit"} />
        </div>
      </div>
    </div>
  )
}

export default WithProtectedRoute(Index)
