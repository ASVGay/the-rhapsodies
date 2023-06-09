import { Instrument } from "@/types/database-types"

export interface ISuggestion {
  artist: string[]
  link: string | null
  motivation: string
  title: string
  instruments: ISuggestionInstrument[]
  image: string | null
  previewUrl: string | null
}

export interface ISuggestionInstrument {
  id?: string
  description: string
  instrument: Instrument
}

export interface InputsSongInformation {
  artist: string
  link: string
  motivation: string
  title: string
  image: string | null
  previewUrl: string | null
}
