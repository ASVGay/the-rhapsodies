import React from "react"
import SuggestionPageSection from "@/components/new-suggestion/suggestion-page-section"
import { GetServerSideProps } from "next"
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs"
import {
  deleteSuggestionInstruments,
  getSuggestion,
  updateSuggestion,
  updateSuggestionInstruments,
} from "@/services/suggestion.service"
import { InputsSongInformation, NewSuggestionInstrument } from "@/interfaces/new-suggestion"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { Database } from "@/types/database"
import { useRouter } from "next/router"
import { Area } from "@/constants/area"
import { AppState } from "@/redux/store"
import { useDispatch, useSelector } from "react-redux"
import { mapEditInstruments } from "@/helpers/new-suggestion.helper"
import {
  updateEditSuggestion,
  updateDeletedInstrumentUuid,
  updateLastEditedUuid,
  setActiveArea,
} from "@/redux/slices/edit-suggestion.slice"
import { Song } from "@/types/database-types"

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

    const author: { id: string } = data?.author as { id: string }
    // If the user does not match with the author of the suggestion
    if (session?.user.id !== author.id)
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

const EditSuggestionPage = (props: EditSuggestionPageProps) => {
  const supabase = useSupabaseClient<Database>()
  const router = useRouter()
  const dispatch = useDispatch()

  const lastEditedUuid = useSelector((state: AppState) => state.editSuggestion.lastEditedUuid)
  const suggestion = useSelector((state: AppState) => state.editSuggestion.suggestion)
  const activeArea = useSelector((state: AppState) => state.editSuggestion.activeArea)
  const deletedInstruments = useSelector(
    (state: AppState) => state.editSuggestion.deletedInstrumentUuids
  )

  //If the user visits a new edit page, clear the previously edited from redux
  if (props.suggestion.id !== lastEditedUuid) {
    const suggestionInstruments: NewSuggestionInstrument[] = []
    props.suggestion.song_instruments.forEach(
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
        artist: props.suggestion.artist,
        link: props.suggestion.link,
        motivation: props.suggestion.motivation,
        title: props.suggestion.title,
        instruments: suggestionInstruments,
      })
    )

    dispatch(updateDeletedInstrumentUuid([]))
    dispatch(updateLastEditedUuid(props.suggestion.id))
  }

  const saveSuggestion = async (onSuccess: () => void, onError: () => void) => {
    try {
      const suggestionResponse = await updateSuggestion(supabase, suggestion, lastEditedUuid ?? "")
      if (suggestionResponse.error) throw new Error("Failed to update song")

      const suggestionId = suggestionResponse.data.at(0)!.id
      const suggestionInstrumentResponse = await updateSuggestionInstruments(
        supabase,
        mapEditInstruments(suggestion, suggestionId)
      )
      if (suggestionInstrumentResponse.error) throw Error("Failed to update song_instruments")

      const deleteSuggestionResponse = await deleteSuggestionInstruments(
        supabase,
        deletedInstruments
      )
      if (deleteSuggestionResponse.error) throw new Error("Failed to delete song_instruments")

      await router.push(`/suggestions/${suggestionId}`).then(() => {
        onSuccess()
        dispatch(setActiveArea(Area.SongInformation))
        dispatch(updateLastEditedUuid(""))
        dispatch(updateDeletedInstrumentUuid([]))
      })
    } catch (error) {
      onError()
    }
  }

  const callSaveSuggestion = (success: () => void, error: () => void) => {
    saveSuggestion(success, error).catch(() => {})
  }

  const onInstrumentSubmit = (newInstruments: NewSuggestionInstrument[]) => {
    //Add deleted entries to redux to remove on submit.
    const oldIds = newInstruments.map((item) => item.id)
    const newIds = suggestion.instruments.map((item) => item.id)
    const missingIds = newIds.filter((id) => !oldIds.includes(id)) as string[]
    dispatch(updateDeletedInstrumentUuid([...deletedInstruments, ...missingIds]))

    dispatch(
      updateEditSuggestion({
        ...suggestion,
        instruments: newInstruments,
      })
    )
    dispatch(setActiveArea(Area.Review))
  }

  const onSongInformationSubmit = ({ title, artist, link, motivation }: InputsSongInformation) => {
    dispatch(
      updateEditSuggestion({
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
      title={"Edit Suggestion"}
      newSuggestion={suggestion}
      startingArea={activeArea}
      onSongInformationSubmit={onSongInformationSubmit}
      onAreaSelect={(area) => {
        dispatch(setActiveArea(area))
      }}
      onInstrumentSubmit={(newInstruments) => {
        onInstrumentSubmit(newInstruments)
      }}
      onCloseClicked={() => {
        router.push(`/suggestions/${props.suggestion.id}`)
      }}
      onReviewSubmit={callSaveSuggestion}
    />
  )
}

export default EditSuggestionPage
