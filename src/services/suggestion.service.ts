import { SupabaseClient } from "@supabase/supabase-js"
import { Database } from "@/types/database"
import {
  DivisionDatabaseOperation,
  SuggestionInstrument,
  SuggestionInstrumentDatabaseOperation
} from "@/types/database-types"
import { NewInstrument, NewSuggestion } from "@/interfaces/new-suggestion"

export const getSuggestions = async (supabase: SupabaseClient<Database>) => {
  return supabase.from("suggestion").select(`
      *,
      suggestion_instruments:suggestion_instrument (
        id,
        instrument (*),
        division (*)
      )
    `)
}

export const getSuggestion = async (supabase: SupabaseClient<Database>, id: string) => {
  return supabase
    .from("suggestion")
    .select(
      `*,
        author (display_name),
        suggestion_instruments:suggestion_instrument (
          id,
          instrument (*),
          division (
            *,
            musician (display_name, id)
          )
        )`
    )
    .eq("id", id)
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
    .eq("suggestion_instrument_id", division.suggestion_instrument_id)
}


export const insertSuggestion = async (
  supabaseClient: SupabaseClient<Database>,
  { artist, link, motivation, title }: NewSuggestion,
  uid: string
) => {
  return supabaseClient
    .from("suggestion")
    .insert({
      title: title,
      artist: artist,
      motivation: motivation,
      author: uid,
      link: link
    })
    .select()
}

export const insertSuggestionInstruments = async (
  supabaseClient: SupabaseClient<Database>,
  operation: SuggestionInstrumentDatabaseOperation[]
) => {
  return supabaseClient
    .from("suggestion_instrument")
    .insert(operation)
}
