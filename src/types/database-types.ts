import { Database } from "@/types/database"

export type DisplayName = { display_name: string }

export type Instrument = Database["public"]["Tables"]["instrument"]["Row"]

export type DivisionDatabaseOperation = Database["public"]["Tables"]["division"]["Insert"]

export type SuggestionInstrumentDatabaseOperation = Database["public"]["Tables"]["suggestion_instrument"]["Insert"]

export type Division = Database["public"]["Tables"]["division"]["Row"] & {
  musician: {
    display_name: string
    id: string
  }
}

export type SuggestionInstrument = Database["public"]["Tables"]["suggestion_instrument"]["Row"] & {
  instrument: Instrument
  division: Division[]
}

export type Suggestion = Database["public"]["Tables"]["suggestion"]["Row"] & {
  suggestion_instruments: SuggestionInstrument[]
  author: string | DisplayName
}

export type Song = Database["public"]["Tables"]["song"]["Row"]

export type SongInstrument = Database["public"]["Tables"]["song_instrument"]["Row"]

export type SongDivision = Database["public"]["Tables"]["song_division"]["Row"] & {
  musician: {
    display_name: string
    id: string
  }
}

export type SongInstrumentDatabaseOperation = Database["public"]["Tables"]["song_instrument"]["Insert"] & {
  instrument: Instrument
  division: SongDivision[]
}

export type SongDatabaseOperation = Database["public"]["Tables"]["song"]["Insert"] & {
  instruments: SongInstrumentDatabaseOperation[]
}

