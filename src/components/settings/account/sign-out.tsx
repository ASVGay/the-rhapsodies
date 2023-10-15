import React from "react"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { Database } from "@/types/database"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import SettingsButton from "@/components/settings/controls/settings-button"
import OneSignal from "react-onesignal"

const SignOut = () => {
  const supabase = useSupabaseClient<Database>()
  const router = useRouter()

  const showLogoutError = () => {
    toast.warn("Something went wrong while logging out. Please try again.")
  }

  const signOut = () => {
    ;(async () => {
      const confirmed = window.confirm("Are you sure you want to sign out?")
      if (!confirmed) return

      // Log out of OneSignal
      OneSignal.User.PushSubscription.optOut()
        .then(async () => {
          const res = await supabase.auth.signOut()
          res.error ? showLogoutError() : router.push("/sign-in").then(() => router.reload())
        })
        .catch(() => showLogoutError())
    })()
  }
  return (
    <SettingsButton dataCy={"logout-btn"} disabled={false} onClick={signOut} text={"Sign out"} />
  )
}

export default SignOut
