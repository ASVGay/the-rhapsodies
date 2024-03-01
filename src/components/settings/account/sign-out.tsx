import React from "react"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { Database } from "@/types/database"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import SettingsButton from "@/components/settings/controls/settings-button"
import OneSignal from "react-onesignal"

type SignOutButtonStyle = "default" | "link"

interface SignOutProps {
  style?: SignOutButtonStyle
  text?: string
}

const SignOut = ({ style = "default", text = "Sign out" }: SignOutProps = {}) => {
  const supabase = useSupabaseClient<Database>()
  const router = useRouter()

  const showLogoutError = () => {
    toast.error("Something went wrong while logging out. Please try again.")
  }

  async function signOutSupabase() {
    const res = await supabase.auth.signOut()
    res.error ? showLogoutError() : router.push("/sign-in").then(() => router.reload())
  }

  const signOut = () => {
    ;(async () => {
      const confirmed = window.confirm("Are you sure you want to sign out?")
      if (!confirmed) return

      if (process.env.NEXT_PUBLIC_DISABLE_ONESIGNAL !== "true") {
        // Log out of OneSignal
        OneSignal.User.PushSubscription.optOut()
          .then(async () => {
            // Add delay to ensure OneSignal has time to opt out
            await new Promise((resolve) => setTimeout(resolve, 1000))
            await signOutSupabase()
          })
          .catch(() => showLogoutError())
      } else await signOutSupabase()
    })()
  }
  return style === "default" ? (
    <SettingsButton dataCy={"logout-btn"} disabled={false} onClick={signOut} text={text} />
  ) : (
    <button
      onClick={signOut}
      className={"text-center text-sm text-gray-400"}
      data-cy={"logout-btn"}
    >
      {text}
    </button>
  )
}

export default SignOut
