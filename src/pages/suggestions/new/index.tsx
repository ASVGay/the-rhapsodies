import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppState } from "@/redux/store"
import SuggestionPageSection from "@/components/suggestion/suggestion-page-section"
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
import { getSongInformationFormData, mapInstruments } from "@/helpers/new-suggestion.helper"
import { InputsSongInformation, ISuggestionInstrument } from "@/interfaces/suggestion"
import { FormProvider, useForm } from "react-hook-form"

const NewSuggestion = () => {
  const suggestion = useSelector((state: AppState) => state.newSuggestion.suggestion)
  const activeArea = useSelector((state: AppState) => state.newSuggestion.activeArea)

  const supabase = useSupabaseClient<Database>()
  const dispatch = useDispatch()
  const router = useRouter()
  const user = useUser()
  const methods = useForm<InputsSongInformation>(getSongInformationFormData(suggestion))

  const saveSuggestion = (onSuccess: () => void, onError: () => void) => {
    if (user === null) {
      onError()
      return
    }
    insertSuggestion(supabase, suggestion, user.id)
      .then((response) => {
        if (response.error) {
          onError()
          return
        }

        const suggestionId = response.data.at(0)!.id
        insertSuggestionInstruments(supabase, mapInstruments(suggestion.instruments, suggestionId))
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
  }

  const onInstrumentSubmit = (newInstruments: ISuggestionInstrument[]) => {
    dispatch(
      updateNewSuggestion({
        ...suggestion,
        instruments: newInstruments,
      })
    )
  }

  const onSongInformationSubmit = ({
    title,
    artist,
    link,
    motivation,
    image,
    previewUrl,
  }: InputsSongInformation) => {
    dispatch(
      updateNewSuggestion({
        ...suggestion,
        title,
        artist: [artist],
        link,
        motivation,
        image,
        previewUrl,
      })
    )
  }

  const onClearClicked = () => {
    dispatch(setActiveArea(Area.SongInformation))
    dispatch(
      updateNewSuggestion({
        title: "",
        artist: [],
        link: null,
        motivation: "",
        instruments: [],
        image: null,
        previewUrl: null,
      })
    )
  }

  return (
    <FormProvider {...methods}>
      <SuggestionPageSection
        title={"New Suggestion"}
        newSuggestion={suggestion}
        currentArea={activeArea}
        onClearClicked={onClearClicked}
        onSongInformationSubmit={onSongInformationSubmit}
        onAreaSelect={(area) => dispatch(setActiveArea(area))}
        onInstrumentSubmit={onInstrumentSubmit}
        onReviewSubmit={saveSuggestion}
        onCloseClicked={() => {
          router.push("/suggestions")
        }}
      />
    </FormProvider>
  )
}

export default NewSuggestion
