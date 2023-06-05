import { SupabaseClient } from "@supabase/supabase-js"
import { Database } from "@/types/database"
import {
  DivisionDatabaseOperation,
  SuggestionInstrumentDatabaseOperation,
  SuggestionInstrumentEditDatabaseOperation,
} from "@/types/database-types"
import { NewSuggestion } from "@/interfaces/new-suggestion"

export const getSuggestions = async (supabase: SupabaseClient<Database>) => {
  return supabase.from("suggestion").select(`
      *,
      suggestion_instruments:suggestion_instrument (
        id,
        description,
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
        author (display_name, id),
        suggestion_instruments:suggestion_instrument (
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
      link: link,
    })
    .select()
}

export const updateSuggestion = async (
  supabaseClient: SupabaseClient<Database>,
  { artist, link, motivation, title }: NewSuggestion,
  uid: string
) => {
  return supabaseClient
    .from("suggestion")
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
  operations: SuggestionInstrumentDatabaseOperation[]
) => {
  return supabaseClient.from("suggestion_instrument").upsert(operations)
}

export const insertSuggestionInstruments = async (
  supabaseClient: SupabaseClient<Database>,
  operation: SuggestionInstrumentDatabaseOperation[]
) => {
  return supabaseClient.from("suggestion_instrument").insert(operation)
}

export const deleteSuggestionInstruments = async (
  supabaseClient: SupabaseClient<Database>,
  ids: string[]
) => {
  return supabaseClient.from("suggestion_instrument").delete().in("id", ids)
}
