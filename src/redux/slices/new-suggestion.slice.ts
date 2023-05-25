import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { NewSuggestion } from "@/interfaces/new-suggestion"
import { Area } from "@/constants/area"

export interface NewSuggestionSlice {
  activeArea: Area
  suggestion: NewSuggestion
}

export const initialState: NewSuggestionSlice = {
  activeArea: Area.SongInformation,
  suggestion: {
    title: "",
    artist: [],
    link: null,
    motivation: "",
    instruments: [],
  },
}

export const newSuggestionSlice = createSlice({
  name: "new-suggestion",
  initialState,
  reducers: {
    setActiveArea(state, action: PayloadAction<Area>) {
      return {
        ...state,
        activeArea: action.payload,
      }
    },
    updateNewSuggestion(state, action: PayloadAction<NewSuggestion>) {
      return {
        ...state,
        suggestion: action.payload,
      }
    },
    updateInstrumentNewSuggestion(state, action: PayloadAction<NewSuggestion>) {
      return {
        ...state,
        suggestion: action.payload,
      }
    },
  },
})

export const { updateNewSuggestion, setActiveArea } = newSuggestionSlice.actions
export default newSuggestionSlice.reducer
