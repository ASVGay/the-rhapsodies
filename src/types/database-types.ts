import { Database } from "@/types/database"

export type DisplayName = { display_name: string }
export type Member = Database["public"]["Tables"]["member"]["Row"]

export type Instrument = Database["public"]["Tables"]["instrument"]["Row"]

export type DivisionDatabaseOperation = Database["public"]["Tables"]["division"]["Insert"]

export type SongInstrumentDatabaseOperation =
  Database["public"]["Tables"]["song_instrument"]["Insert"]

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
}

export type Events = Database["public"]["Functions"]["get_events_with_attendance"]["Returns"]
export type Event = Database["public"]["Tables"]["event"]["Row"]
export type EventWithAttendance = Event & {
  present: number
  absent: number
  undecided: number
}
export type EventType = Database["public"]["Enums"]["event_type"]

export type Attending = Database["public"]["Enums"]["attending"]

export type AttendingMembers = Database["public"]["Functions"]["get_members_by_event"]["Returns"]

export type InsertEvent = Database["public"]["Tables"]["event"]["Insert"]
export type UpdateEvent = Database["public"]["Tables"]["event"]["Update"]
