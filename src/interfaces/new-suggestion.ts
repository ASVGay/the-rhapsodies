export interface Instrument {
  id: string
  name: string
  note: string
}

//TODO refine model
export interface NewSuggestion {
  artist: string[]
  link: string | null
  motivation: string
  title: string
  instruments: Instrument[]
}
