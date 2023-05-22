export interface NewInstrument {
  id: string
  name: string
  image: string
  note: string | undefined
}

export interface NewSuggestion {
  artist: string[]
  link: string | null
  motivation: string
  title: string
  instruments: NewInstrument[]
}
