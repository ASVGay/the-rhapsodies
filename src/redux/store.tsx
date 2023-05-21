import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit"
import { newSuggestionSlice } from "@/redux/slices/new-suggestion.slice"

const makeStore = () => {
  return configureStore({
    reducer: {
      newSuggestion: newSuggestionSlice.reducer,
    },
  })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>

export default store
