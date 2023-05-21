export interface NewInstrument {
  id: string
  name: string
  image: string
  note: string
}

export interface NewSuggestion {
  artist: string[]
  link: string | null
  motivation: string
  title: string
  instruments: NewInstrument[]
}
