import { SupabaseClient } from "@supabase/supabase-js"
import { Database } from "@/types/database"
import { Instrument, Song, Suggestion } from "@/types/database-types"

export const createSongFromSuggestion = async (
  supabaseClient: SupabaseClient<Database>,
  suggestion: Suggestion
) => {
  const { data: song_data, error: song_error } = await supabaseClient
    .from("song")
    .insert({
      title: suggestion.title,
      artist: suggestion.artist,
      link: suggestion.link
    })
    .select()

  const songId = (song_data as Song[])[0].id

  for (const instrument of suggestion.suggestion_instruments) {
    const { data, error } = await supabaseClient
      .from("song_instrument")
      .insert({
        instrument_id: instrument.instrument.id,
        song_id: songId,
        description: instrument.description
      })
      .select()
    const songInstrumentId = (data as Instrument[])[0].id
    const divisions = suggestion.suggestion_instruments
      .flatMap((instrument) => instrument.division)
      .map((division) => ({
        song_instrument_id: songInstrumentId,
        musician: division.musician.id
      }))
    const { data: division_data, error: division_error } = await supabaseClient
      .from("song_division")
      .insert(divisions)
  }

  return songId
}
