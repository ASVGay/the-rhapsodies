import { SupabaseClient } from "@supabase/supabase-js"
import { Database } from "@/types/database"
import { SuggestionInstrument } from "@/types/database-types"

export const insertSuggestionInstrument = async (
  supabase: SupabaseClient<Database>,
  instrument: SuggestionInstrument
) => {
  return supabase.from("suggestion_instrument").insert([
    {
      suggestion_id: instrument.suggestion_id,
      instrument_id: instrument.instrument_id,
      description: instrument.description,
    },
  ])
}
