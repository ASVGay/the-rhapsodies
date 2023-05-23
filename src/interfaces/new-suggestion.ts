import { Instrument } from "@/types/database-types"

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

export interface InputsSongInformation {
  artist: string
  link: string
  motivation: string
  title: string
}
