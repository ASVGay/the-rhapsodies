import { toast } from "react-toastify"
import { NextRouter } from "next/router"
import { SupabaseClient } from "@supabase/supabase-js"
import { UseFormSetError } from "react-hook-form"
import { Database } from "@/types/database"

const signOutError = () => toast.error("Something went wrong while logging out.")

export const handleNoUser = (supabase: SupabaseClient<Database>, router: NextRouter) => {
  toast.error("Something went wrong while retrieving your data. Please sign in again.", {
    toastId: "handle-no-user",
  })
  supabase.auth
    .signOut()
    .then(async (response) => {
      if (response.error) signOutError()
      else await router.push("/sign-in")
    })
    .catch(() => signOutError)
}

export const showIncorrectPassword = (setError: UseFormSetError<any>) => {
  toast.error("Please fill in your current password correctly.", {
    toastId: "incorrect-password",
  })
  setError("currentPassword", { type: "custom", message: "Incorrect password" })
}
