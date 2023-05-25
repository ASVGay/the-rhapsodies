import { SupabaseClient } from "@supabase/supabase-js"
import { Database } from "@/types/database"

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
