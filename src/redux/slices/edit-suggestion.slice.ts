import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ISuggestion } from "@/interfaces/suggestion"
import { Area } from "@/constants/area"

export interface EditSuggestionSlice {
  activeArea: Area
  lastEditedUuid: string
  suggestion: ISuggestion
  deletedInstrumentUuids: string[]
}

export const initialState: EditSuggestionSlice = {
  activeArea: Area.SongInformation,
  deletedInstrumentUuids: [],
  suggestion: {
    title: "",
    artist: [],
    link: null,
    motivation: "",
    instruments: [],
    image: null,
    previewUrl: null
  },
  lastEditedUuid: "",
}

export const editSuggestionSlice = createSlice({
  name: "edit-suggestion",
  initialState,
  reducers: {
    setActiveArea(state, action: PayloadAction<Area>) {
      return {
        ...state,
        activeArea: action.payload,
      }
    },
    updateLastEditedUuid(state, action: PayloadAction<string>) {
      return {
        ...state,
        lastEditedUuid: action.payload,
      }
    },
    updateDeletedInstrumentUuids(state, action: PayloadAction<string[]>) {
      return {
        ...state,
        deletedInstrumentUuids: action.payload,
      }
    },
    updateEditSuggestion(state, action: PayloadAction<ISuggestion>) {
      return {
        ...state,
        suggestion: action.payload,
      }
    },
  },
})

export const {
  updateDeletedInstrumentUuids,
  updateLastEditedUuid,
  updateEditSuggestion,
  setActiveArea,
} = editSuggestionSlice.actions
export default editSuggestionSlice.reducer
