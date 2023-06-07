import { SupabaseClient } from "@supabase/supabase-js"
import { Database } from "@/types/database"
import { DivisionDatabaseOperation, SongInstrumentDatabaseOperation } from "@/types/database-types"
import { NewSuggestion } from "@/interfaces/new-suggestion"

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
    `
    )
    .eq("inRepertoire", false)
}

export const getSuggestion = async (supabase: SupabaseClient<Database>, id: string) => {
  return supabase
    .from("song")
    .select(
      `*,
        author (display_name, id),
        song_instruments:song_instrument (
          id,
          description,
          instrument (*),
          division (
            *,
            musician (display_name, id)
          )
        )`
    )
    .eq("id", id)
    .eq("inRepertoire", false)
    .limit(1)
    .single()
}

export const insertDivision = (
  supabaseClient: SupabaseClient<Database>,
  division: DivisionDatabaseOperation
) => {
  return supabaseClient.from("division").insert(division)
}

export const deleteDivision = (
  supabaseClient: SupabaseClient<Database>,
  division: DivisionDatabaseOperation
) => {
  return supabaseClient
    .from("division")
    .delete()
    .eq("musician", division.musician)
    .eq("song_instrument_id", division.song_instrument_id)
}

export const insertSuggestion = async (
  supabaseClient: SupabaseClient<Database>,
  { artist, link, motivation, title }: NewSuggestion,
  uid: string
) => {
  return supabaseClient
    .from("song")
    .insert({
      title: title,
      artist: artist,
      motivation: motivation,
      author: uid,
      link: link,
    })
    .eq("inRepertoire", false)
    .select()
}

export const updateSuggestion = async (
  supabaseClient: SupabaseClient<Database>,
  { artist, link, motivation, title }: NewSuggestion,
  uid: string
) => {
  return supabaseClient
    .from("song")
    .update({
      title: title,
      artist: artist,
      motivation: motivation,
      link: link,
    })
    .eq("id", uid)
    .select()
}

export const updateSuggestionInstruments = async (
  supabaseClient: SupabaseClient<Database>,
  operations: SongInstrumentDatabaseOperation[]
) => {
  return supabaseClient.from("song_instrument").upsert(operations)
}

export const insertSuggestionInstruments = async (
  supabaseClient: SupabaseClient<Database>,
  operation: SongInstrumentDatabaseOperation[]
) => {
  return supabaseClient.from("song_instrument").insert(operation)
}

export const deleteSuggestion = async (supabaseClient: SupabaseClient<Database>, id: string) => {
  return supabaseClient.from("song").delete().eq("id", id).eq("inRepertoire", false)
}

export const deleteSuggestionInstruments = async (
  supabaseClient: SupabaseClient<Database>,
  ids: string[]
) => {
  return supabaseClient.from("song_instrument").delete().in("id", ids)
}
