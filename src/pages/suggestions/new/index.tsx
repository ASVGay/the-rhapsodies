import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppState } from "@/redux/store"
import SuggestionPageSection from "@/components/new-suggestion/suggestion-page-section"
import { Area } from "@/constants/area"
import {
  updateNewSuggestion,
  initialState,
  setActiveArea,
} from "@/redux/slices/new-suggestion.slice"
import { insertSuggestion, insertSuggestionInstruments } from "@/services/suggestion.service"
import { Database } from "@/types/database"
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { useRouter } from "next/router"
import { mapInstruments } from "@/helpers/new-suggestion.helper"
import { InputsSongInformation, NewSuggestionInstrument } from "@/interfaces/new-suggestion"

const NewSuggestion = () => {
  const suggestion = useSelector((state: AppState) => state.newSuggestion.suggestion)
  const activeArea = useSelector((state: AppState) => state.newSuggestion.activeArea)

  const supabase = useSupabaseClient<Database>()
  const dispatch = useDispatch()
  const router = useRouter()
  const user = useUser()

  const saveSuggestion = (onSuccess: () => void, onError: () => void) => {
    if (user) {
      insertSuggestion(supabase, suggestion, user.id)
        .then((response) => {
          if (response.error) {
            onError()
            return
          }

          const suggestionId = response.data.at(0)!.id
          insertSuggestionInstruments(supabase, mapInstruments(suggestion, suggestionId))
            .then((response) => {
              if (response.error) {
                onError()
                return
              }

              router.push("/suggestions").then(() => {
                onSuccess()
                dispatch(updateNewSuggestion(initialState.suggestion))
                dispatch(setActiveArea(Area.SongInformation))
              })
            })
            .catch(() => onError())
        })
        .catch(() => onError())
    } else {
      onError()
    }
  }

  const onAreaSelect = (area: Area) => {
    dispatch(setActiveArea(area))
  }

  const onInstrumentSubmit = (newInstruments: NewSuggestionInstrument[]) => {
    dispatch(
      updateNewSuggestion({
        ...suggestion,
        instruments: newInstruments,
      })
    )
    dispatch(setActiveArea(Area.Review))
  }

  const onSongInformationSubmit = ({ title, artist, link, motivation }: InputsSongInformation) => {
    dispatch(
      updateNewSuggestion({
        ...suggestion,
        title,
        artist: [artist],
        link,
        motivation,
      })
    )
  }

  return (
    <SuggestionPageSection
      title={"New Suggestion"}
      newSuggestion={suggestion}
      startingArea={activeArea}
      onSongInformationSubmit={onSongInformationSubmit}
      onAreaSelect={onAreaSelect}
      onInstrumentSubmit={(newInstruments) => {
        onInstrumentSubmit(newInstruments)
      }}
      onReviewSubmit={(success, error) => saveSuggestion(success, error)}
    />
  )
}

export default NewSuggestion
