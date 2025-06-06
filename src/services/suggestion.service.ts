import { QueryData, SupabaseClient } from "@supabase/supabase-js"
import { Database } from "@/types/database"
import { DivisionDatabaseOperation, SongInstrumentDatabaseOperation } from "@/types/database-types"
import { ISuggestion } from "@/interfaces/suggestion"

export const getSuggestions = async (supabase: SupabaseClient<Database>) => {
  return supabase
    .from("song")
    .select(
      `
      *,
      song_instruments:song_instrument (
        id,
        instrument (*),
        division (*)
      )
    `,
    )
    .eq("inRepertoire", false)
    .order("created_at", { ascending: false })
}

export const getRepertoireSongs = async (supabase: SupabaseClient<Database>) => {
  return supabase
    .from("song")
    .select(
      `
      *,
      song_instruments:song_instrument (
        id,
        instrument (*),
        division (*)
      )
    `,
    )
    .eq("inRepertoire", true)
    .order("artist")
}

export const getSuggestion = async (supabase: SupabaseClient<Database>, id: string) => {
  return supabase
    .from("song")
    .select(
      `*,
        author:member (display_name, id),
        song_instruments:song_instrument (
          id,
          description,
          instrument_id,
          song_id,
          instrument (*),
          division (
            *,
            musician:member(display_name, id)
          )
        )`,
    )
    .eq("id", id)
    .eq("inRepertoire", false)
    .limit(1)
    .single()
}

export type Suggestion = QueryData<ReturnType<typeof getSuggestion>>

export const insertDivision = async (
  supabaseClient: SupabaseClient<Database>,
  division: DivisionDatabaseOperation,
) => {
  return supabaseClient.from("division").insert(division)
}

export const deleteDivision = async (
  supabaseClient: SupabaseClient<Database>,
  division: DivisionDatabaseOperation,
) => {
  return supabaseClient
    .from("division")
    .delete()
    .eq("musician", division.musician)
    .eq("song_instrument_id", division.song_instrument_id)
}

export const insertSuggestion = async (
  supabaseClient: SupabaseClient<Database>,
  { artist, link, motivation, title, image, previewUrl }: ISuggestion,
  uid: string,
) => {
  return supabaseClient
    .from("song")
    .insert({
      title: title,
      artist: artist,
      motivation: motivation,
      author: uid,
      link: link,
      image: image,
      previewUrl: previewUrl,
    })
    .eq("inRepertoire", false)
    .select()
}

export const updateSuggestion = async (
  supabaseClient: SupabaseClient<Database>,
  { artist, link, motivation, title, image, previewUrl }: ISuggestion,
  uid: string,
) => {
  return supabaseClient
    .from("song")
    .update({
      title: title,
      artist: artist,
      motivation: motivation,
      link: link,
      image: image,
      previewUrl: previewUrl,
    })
    .eq("id", uid)
    .select()
}

export const updateSuggestionInstruments = async (
  supabaseClient: SupabaseClient<Database>,
  operations: SongInstrumentDatabaseOperation[],
) => {
  return supabaseClient.from("song_instrument").upsert(operations)
}

export const insertSuggestionInstruments = async (
  supabaseClient: SupabaseClient<Database>,
  operation: SongInstrumentDatabaseOperation[],
) => {
  return supabaseClient.from("song_instrument").insert(operation)
}

export const deleteSuggestion = async (supabaseClient: SupabaseClient<Database>, id: string) => {
  return supabaseClient.from("song").delete().eq("id", id).eq("inRepertoire", false)
}

export const deleteSuggestionInstruments = async (
  supabaseClient: SupabaseClient<Database>,
  ids: string[],
) => {
  return supabaseClient.from("song_instrument").delete().in("id", ids)
}
