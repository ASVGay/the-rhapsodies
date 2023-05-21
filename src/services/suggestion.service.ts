import { SupabaseClient } from "@supabase/supabase-js"
import { Database } from "@/types/database"
import { DivisionDatabaseOperation, Suggestion } from "@/types/database-types"
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

export const getInstrumentImage = (sourceName: string) => {
  return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/v1684372007/instrument-icons/${sourceName}.svg`
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
}

export const insertSuggestionInstruments = async (
  supabaseClient: SupabaseClient<Database>,
  instruments: NewInstrument[],
  suggestionId: string
) => {
  const instrumentData = instruments.map((instrument) => {
    return ({ "suggestion_id": suggestionId, "instrument_id": instrument.id, "description": instrument.note })
  })

  return supabaseClient
    .from("suggestion_instrument")
    .insert(instrumentData)
}