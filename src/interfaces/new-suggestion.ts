export interface Instrument {
  id: string
  note:string
}

export interface NewSuggestion {
  artist: string[]
  link: string | null
  motivation: string
  title: string
  instruments: Instrument[]
}
