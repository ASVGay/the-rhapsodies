import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { NewSuggestion } from "@/interfaces/new-suggestion"

export const initialState: NewSuggestion = {
  title: "",
  artist: [],
  link: null,
  motivation: "",
  instruments: [],
}

export const newSuggestionSlice = createSlice({
  name: "new-suggestion",
  initialState,
  reducers: {
    updateNewSuggestion(state, action: PayloadAction<NewSuggestion>) {
      return action.payload
    },
  },
})

export const { updateNewSuggestion } = newSuggestionSlice.actions
export default newSuggestionSlice.reducer
