import { Database } from "@/types/database"

export type DisplayName = { display_name: string }

export type Instrument = Database["public"]["Tables"]["instrument"]["Row"]

export type DivisionDatabaseOperation = Database["public"]["Tables"]["division"]["Insert"]

export type SongInstrumentDatabaseOperation = Database["public"]["Tables"]["song_instrument"]["Insert"]

export type Division = Database["public"]["Tables"]["division"]["Row"] & {
  musician: {
    display_name: string
    id: string
  }
}

export type SongInstrument = Database["public"]["Tables"]["song_instrument"]["Row"] & {
  instrument: Instrument
  division: Division[]
}

export type Song = Database["public"]["Tables"]["song"]["Row"] & {
  song_instruments: SongInstrument[]
  author: string | DisplayName
}

export type RepertoireSong = Database["public"]["Tables"]["song"]["Row"] & {
  song_instruments: SongInstrument[]
}

