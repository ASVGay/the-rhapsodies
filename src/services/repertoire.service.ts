import { SupabaseClient } from "@supabase/supabase-js"
import { Database } from "@/types/database"

//TODO add song instruments

export const createSong = async (
  supabaseClient: SupabaseClient<Database>,
  song: any
) => {
  return supabaseClient
    .from("suggestion")
    .insert(song)
    .select()
}