import { createSlice } from "@reduxjs/toolkit"
import { HYDRATE } from "next-redux-wrapper"
import { AppState } from "@/store/store"
import { initialState } from "@/store/create-suggestion/data"

export const createSuggestionSlice = createSlice({
  name: "create-suggestion",
  initialState,
  reducers: {
    setState(state, action) {
      state = action.payload
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.createSuggestion,
      }
    },
  },
})

export const { setState } = createSuggestionSlice.actions

export const getState = (state: AppState) => state.createSuggestion

export default createSuggestionSlice.reducer
