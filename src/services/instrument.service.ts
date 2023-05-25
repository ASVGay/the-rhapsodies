import { SupabaseClient } from "@supabase/supabase-js"
import { Database } from "@/types/database"

export const getInstruments = async (supabase: SupabaseClient<Database>) => {
  return supabase.from("instrument").select("*").order("instrument_name", { ascending: true })
}
