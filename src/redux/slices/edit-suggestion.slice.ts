import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { NewSuggestion } from "@/interfaces/new-suggestion"
import { Area } from "@/constants/area"

export interface EditSuggestionSlice {
  activeArea: Area
  lastEditedUuid?: string
  suggestion: NewSuggestion
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
  },
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
    updateLastDeletedInstrumentUuid(state, action: PayloadAction<string[]>) {
      return {
        ...state,
        deletedInstrumentUuids: action.payload,
      }
    },
    updateEditSuggestion(state, action: PayloadAction<NewSuggestion>) {
      return {
        ...state,
        suggestion: action.payload,
      }
    },
    updateInstrumentEditSuggestion(state, action: PayloadAction<NewSuggestion>) {
      return {
        ...state,
        suggestion: action.payload,
      }
    },
  },
})

export const {
  updateLastDeletedInstrumentUuid,
  updateLastEditedUuid,
  updateEditSuggestion,
  setActiveArea,
} = editSuggestionSlice.actions
export default editSuggestionSlice.reducer
