export interface CreateSuggestionState {
  title: string
  artists: []
  url: string
  motivation: string
  instruments: []
}

export const initialState: CreateSuggestionState = {
  title: "",
  artists: [],
  url: "",
  motivation: "",
  instruments: [],
}
