import React from "react"
import SuggestionPageSection from "@/components/suggestion/suggestion-page-section"
import { GetServerSideProps } from "next"
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs"
import {
  deleteSuggestionInstruments,
  getSuggestion,
  insertSuggestionInstruments,
  updateSuggestion,
  updateSuggestionInstruments,
} from "@/services/suggestion.service"
import { InputsSongInformation, ISuggestionInstrument } from "@/interfaces/suggestion"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { Database } from "@/types/database"
import { useRouter } from "next/router"
import { Area } from "@/constants/area"
import { AppState } from "@/redux/store"
import { useDispatch, useSelector } from "react-redux"
import {
  getSongInformationFormData,
  mapEditInstruments,
  mapInstruments,
} from "@/helpers/new-suggestion.helper"
import {
  setActiveArea,
  updateDeletedInstrumentUuids,
  updateEditSuggestion,
  updateLastEditedUuid,
} from "@/redux/slices/edit-suggestion.slice"
import { Song } from "@/types/database-types"
import { FormProvider, useForm } from "react-hook-form"

export const getServerSideProps: GetServerSideProps = async (context) => {
  const supabase = createPagesServerClient(context)
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession()
  const { params } = context

  try {
    // Check if the suggestion exists
    const { data } = await getSuggestion(supabase, params?.suggestion as string)
    if (data == null) return { notFound: true }

    // If the user does not match with the author of the suggestion
    if (session?.user.id !== data?.author.id)
      return {
        redirect: {
          destination: "/403",
          permanent: false,
        },
      }

    return { props: { suggestion: data } }
  } catch {
    return { notFound: true }
  }
}

interface EditSuggestionPageProps {
  suggestion: Song
}

const EditSuggestionPage = ({ suggestion }: EditSuggestionPageProps) => {
  const supabase = useSupabaseClient<Database>()
  const router = useRouter()
  const dispatch = useDispatch()
  const lastEditedUuid = useSelector((state: AppState) => state.editSuggestion.lastEditedUuid)
  const reduxSuggestion = useSelector((state: AppState) => state.editSuggestion.suggestion)
  const activeArea = useSelector((state: AppState) => state.editSuggestion.activeArea)
  const methods = useForm<InputsSongInformation>(getSongInformationFormData(reduxSuggestion))
  const deletedInstruments = useSelector(
    (state: AppState) => state.editSuggestion.deletedInstrumentUuids
  )

  //If the user visits a new edit page, clear the previously edited from redux
  if (suggestion.id !== lastEditedUuid) {
    const suggestionInstruments: ISuggestionInstrument[] = []
    suggestion.song_instruments.forEach(
      (element: { id: any; description: any; instrument: any }) => {
        suggestionInstruments.push({
          id: element.id,
          description: element.description ?? "",
          instrument: element.instrument,
        })
      }
    )

    dispatch(
      updateEditSuggestion({
        artist: suggestion.artist,
        link: suggestion.link,
        motivation: suggestion.motivation,
        title: suggestion.title,
        instruments: suggestionInstruments,
        image: suggestion.image,
        previewUrl: suggestion.previewUrl,
      })
    )

    dispatch(updateDeletedInstrumentUuids([]))
    dispatch(updateLastEditedUuid(suggestion.id))
  }

  const saveSuggestion = async (onSuccess: () => void, onError: () => void) => {
    try {
      const suggestionResponse = await updateSuggestion(
        supabase,
        reduxSuggestion,
        lastEditedUuid ?? ""
      )
      if (suggestionResponse.error) throw new Error("Failed to update song")

      const updateInstrument: ISuggestionInstrument[] = []
      const insertInstrument: ISuggestionInstrument[] = []
      reduxSuggestion.instruments.forEach((element) => {
        if (element.id) updateInstrument.push(element)
        else insertInstrument.push(element)
      })

      const suggestionId = suggestionResponse.data.at(0)!.id

      const instrumentUpdateResponse = await updateSuggestionInstruments(
        supabase,
        mapEditInstruments(updateInstrument, suggestionId)
      )
      if (instrumentUpdateResponse.error) throw Error("Failed to update song_instruments")

      const instrumentInsertResponse = await insertSuggestionInstruments(
        supabase,
        mapInstruments(insertInstrument, suggestionId)
      )
      if (instrumentInsertResponse.error) throw Error("Failed to insert song_instruments")

      const deleteSuggestionResponse = await deleteSuggestionInstruments(
        supabase,
        deletedInstruments
      )
      if (deleteSuggestionResponse.error) throw new Error("Failed to delete song_instruments")

      await router.push(`/suggestions/${suggestionId}`).then(() => {
        onSuccess()
        dispatch(setActiveArea(Area.SongInformation))
        dispatch(updateLastEditedUuid(""))
        dispatch(updateDeletedInstrumentUuids([]))
      })
    } catch (error) {
      onError()
    }
  }

  const onInstrumentSubmit = (newInstruments: ISuggestionInstrument[]) => {
    // Add deleted entries to redux to remove on submit.
    const oldIds = newInstruments.map((item) => item.id)
    const newIds = suggestion.song_instruments.map((item) => item.id)
    const missingIds = newIds.filter((id) => !oldIds.includes(id))
    dispatch(updateDeletedInstrumentUuids([...deletedInstruments, ...missingIds]))

    dispatch(
      updateEditSuggestion({
        ...reduxSuggestion,
        instruments: newInstruments,
      })
    )
  }

  const onSongInformationSubmit = ({ title, artist, link, motivation }: InputsSongInformation) => {
    dispatch(
      updateEditSuggestion({
        ...reduxSuggestion,
        title,
        artist: [artist],
        link,
        motivation,
      })
    )
  }

  return (
    <FormProvider {...methods}>
      <SuggestionPageSection
        title={"Edit Suggestion"}
        newSuggestion={reduxSuggestion}
        currentArea={activeArea}
        onSongInformationSubmit={onSongInformationSubmit}
        onAreaSelect={(area) => dispatch(setActiveArea(area))}
        onInstrumentSubmit={onInstrumentSubmit}
        onCloseClicked={() => {
          router.push(`/suggestions/${suggestion.id}`)
        }}
        onReviewSubmit={(success, error) => {
          saveSuggestion(success, error).catch(() => {
            error()
          })
        }}
      />
    </FormProvider>
  )
}

export default EditSuggestionPage
