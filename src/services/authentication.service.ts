import { SupabaseClient } from "@supabase/supabase-js"
import { Database } from "@/types/database"
import { toast } from "react-toastify"

export const setName = async (
  supabaseClient: SupabaseClient<Database>,
  id: string,
  name: string
) => {
  return supabaseClient.from("member").insert({ id, display_name: name })
}

export const isInMemberDatabase = (supabaseClient: SupabaseClient<Database>, id: string) => {
  return supabaseClient.from("member").select("*", { count: "exact", head: true }).eq("id", id)
}

export const resetPasswordForEmail = async (supabase: SupabaseClient, email: string) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/api/auth/callback?next=/forgot-password/reset&`,
  })
  if (error) {
    toast.error(error.message)
    return false
  } else {
    return true
  }
}
