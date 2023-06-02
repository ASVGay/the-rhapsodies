import { SupabaseClient } from "@supabase/supabase-js"
import { Database } from "@/types/database"
import { Instrument, Song, Suggestion } from "@/types/database-types"

export const createSongFromSuggestion = async (
  supabaseClient: SupabaseClient<Database>,
  suggestion: Suggestion
) => {
  const { data: song_data } = await supabaseClient
    .from("song")
    .insert({
      title: suggestion.title,
      artist: suggestion.artist,
      link: suggestion.link
    })
    .select()

  const songId = (song_data as Song[])[0].id

  try {
    for (const instrument of suggestion.suggestion_instruments) {
      await supabaseClient
        .from("song_instrument")
        .insert({
          instrument_id: instrument.instrument.id,
          song_id: songId,
          description: instrument.description
        })
        .select()
        .then(async ({ data: instrument_data }) => {
          const songInstrumentId = (instrument_data as Instrument[])[0].id
          const divisions = instrument.division.map(division => ({
            song_instrument_id: songInstrumentId,
            musician: division.musician.id
          }))

          await supabaseClient
            .from("song_division")
            .insert(divisions)
        })
    }
  } catch (err) {
    await deleteSong(supabaseClient, songId).then(() => {
      throw Error("Couldn't insert song details into the database, song creation has been reverted.")
    })
  }

  return songId
}

export const deleteSong = async (
  supabaseClient: SupabaseClient<Database>,
  id: string
) => {
  return supabaseClient
    .from("song")
    .delete()
    .eq("id", id)
}