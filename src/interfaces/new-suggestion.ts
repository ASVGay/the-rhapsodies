import { Instrument, SuggestionInstrument } from "@/types/database-types"

export interface NewSuggestion {
  artist: string[]
  link: string | null
  motivation: string
  title: string
  instruments: NewSuggestionInstrument[]
}

export interface NewSuggestionInstrument {
  description: string
  instrument: Instrument
}
