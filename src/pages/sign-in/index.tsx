import React, { useEffect, useState } from "react"
import Image from "next/image"
import SignInTextField from "@/components/textfields/SigninTextfield"
import { useRouter } from "next/router"
import ErrorPopup from "@/components/popups/error-popup/ErrorPopup"
import { mapAuthErrorCodeToErrorMessage } from "@/util/signin/SigninHelpers"
import MainButton from "@/components/buttons/main-button/MainButton"
import { useAuthContext } from "@/context/AuthContext"
import { FirebaseError } from "@firebase/util"
import { signInUser } from "@/services/AuthenticationService"

const Index = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [showErrorPopup, setErrorPopup] = useState<boolean>()
  const [errorPopupText, setErrorPopupText] = useState<string>("")
  const { user } = useAuthContext()

  const router = useRouter()

  const signIn = () => {
    signInUser(email, password).catch((err) => {
      const firebaseError = err as FirebaseError
      handleBadLogin(firebaseError.code)
    })
  }

  useEffect(() => {
    if (user) {
      router.push("/")
    }
  }, [user])

  const handleBadLogin = (error: string | null) => {
    setErrorPopupText(mapAuthErrorCodeToErrorMessage(error))
    setErrorPopup(true)
  }

  return (
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
        <div className="w-full">
          <SignInTextField
            placeholder={"Email"}
            type={"text"}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
        </div>
        <div className="w-full">
          <SignInTextField
            placeholder={"Password"}
            type={"password"}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
        </div>
        {showErrorPopup && (
          <ErrorPopup
            closePopup={() => setErrorPopup(false)}
            text={errorPopupText}
          />
        )}
        <MainButton onClick={signIn} text={"Sign in"} />
      </div>
    </div>
  )
}

export default Index
