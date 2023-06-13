import { SupabaseClient } from "@supabase/supabase-js"
import { Database } from "@/types/database"

export const getEvent = (supabase: SupabaseClient<Database>, id: string) => {
  return supabase.from("event").select("*").eq("id", id).single()
}
