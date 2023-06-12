import { SupabaseClient } from "@supabase/supabase-js"
import { Database } from "@/types/database"

export const createSongFromSuggestion = async (
  supabaseClient: SupabaseClient<Database>,
  id: string
) => {
  return supabaseClient
    .from("song")
    .update({ "inRepertoire": true })
    .eq("id", id)
}
