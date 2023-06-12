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

export const moveSongToSuggestions = async (
  supabaseClient: SupabaseClient<Database>,
  id: string
) => {
  return supabaseClient
    .from("song")
    .update({ "inRepertoire": false })
    .eq("id", id)
}

export const getSong = async (
  supabase: SupabaseClient<Database>,
  id: string
) => {
  return supabase
    .from("song")
    .select(`
      id,
      artist,
      link,
      title,
      song_instruments:song_instrument (
        id,
        description,
        instrument (*),
        division (
          *,
          musician (display_name, id)
        )
      )
        `)
    .eq("id", id)
    .eq("inRepertoire", true)
    .limit(1)
    .single()
}