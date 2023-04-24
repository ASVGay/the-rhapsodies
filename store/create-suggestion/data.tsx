export interface CreateSuggestionState {
  title: string,
  artists: [],
  url: string | undefined,
  motivation: string,
  instruments: []
}

export const initialState: CreateSuggestionState = {
  title: "",
  artists: [],
  url: undefined,
  motivation: "",
  instruments: []
}
