import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ISuggestion } from "@/interfaces/suggestion"
import { Area } from "@/constants/area"

export interface NewSuggestionSlice {
  activeArea: Area
  suggestion: ISuggestion
}

export const initialState: NewSuggestionSlice = {
  activeArea: Area.SongInformation,
  suggestion: {
    title: "",
    artist: [],
    link: null,
    motivation: "",
    instruments: [],
    image: null,
    previewUrl: null
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
    updateNewSuggestion(state, action: PayloadAction<ISuggestion>) {
      return {
        ...state,
        suggestion: action.payload,
      }
    },
    updateInstrumentNewSuggestion(state, action: PayloadAction<ISuggestion>) {
      return {
        ...state,
        suggestion: action.payload,
      }
    },
  },
})

export const { updateNewSuggestion, setActiveArea } = newSuggestionSlice.actions
export default newSuggestionSlice.reducer
