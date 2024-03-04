import { SupabaseClient } from "@supabase/supabase-js"
import { Database } from "@/types/database"
import { toast } from "react-toastify"

export const setName = async (
  supabaseClient: SupabaseClient<Database>,
  id: string,
  name: string,
) => {
  return supabaseClient.from("member").upsert({ id, display_name: name })
}

export const isInMemberDatabase = (supabaseClient: SupabaseClient<Database>, id: string) => {
  return supabaseClient.from("member").select("hidden", { count: "exact" }).eq("id", id)
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

export const verifyPassword = (supabaseClient: SupabaseClient<Database>, password: string) => {
  return supabaseClient.rpc("verify_user_password", { password })
}

export const updateDisplayName = (
  supabaseClient: SupabaseClient<Database>,
  newDisplayName: string,
  uid: string,
) => {
  return supabaseClient
    .from("member")
    .update({ display_name: newDisplayName })
    .eq("id", uid)
    .select("display_name")
    .single()
}

export const getDisplayName = (supabaseClient: SupabaseClient<Database>, uid: string) => {
  return supabaseClient.from("member").select("display_name").eq("id", uid).limit(1).single()
}

export const sendChangeEmailRequest = async (supabase: SupabaseClient, email: string) => {
  const { error } = await supabase.auth.updateUser(
    { email },
    { emailRedirectTo: `${window.location.origin}/settings/change-email` },
  )
  if (error) {
    toast.error(error.message)
    return false
  } else {
    return true
  }
}

export const hideUser = async (supabaseClient: SupabaseClient<Database>, id: string) => {
  return supabaseClient.from("member").update({ hidden: true }).eq("id", id)
}
