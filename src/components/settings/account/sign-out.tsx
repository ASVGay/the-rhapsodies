import React from "react"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { Database } from "@/types/database"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import SettingsButton from "@/components/settings/controls/settings-button"

const SignOut = () => {
  const supabase = useSupabaseClient<Database>()
  const router = useRouter()
  const signOut = () => {
    ;(async () => {
      const confirmed = window.confirm("Are you sure you want to sign out?")
      if (!confirmed) return

      const res = await supabase.auth.signOut()
      if (res.error) toast.warn("Can't log out right now.")
      else router.push("/sign-in").then(() => router.reload())
    })()
  }
  return (
    <SettingsButton dataCy={"logout-btn"} disabled={false} onClick={signOut} text={"Sign out"} />
  )
}

export default SignOut
