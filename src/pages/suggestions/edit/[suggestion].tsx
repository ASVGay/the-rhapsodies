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
import { Suggestion } from "@/types/database-types"
import { InputsSongInformation, NewSuggestionInstrument } from "@/interfaces/new-suggestion"
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { Database } from "@/types/database"
import { useRouter } from "next/router"
import { Area } from "@/constants/area"
import { AppState } from "@/redux/store"
import { useDispatch, useSelector } from "react-redux"
import {
  setActiveArea,
  updateEditSuggestion,
  updateLastDeletedInstrumentUuid,
  updateLastEditedUuid,
} from "@/redux/slices/edit-suggestion.slice"
import { mapEditInstruments } from "@/helpers/new-suggestion.helper"

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

    // If the suggestion has no id
    const author: { id: string } = data?.author as { id: string }
    if (author?.id === undefined) return { notFound: true }

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
  suggestion: Suggestion
}

const EditSuggestionPage = (props: EditSuggestionPageProps) => {
  const user = useUser()
  const supabase = useSupabaseClient<Database>()
  const router = useRouter()
  const dispatch = useDispatch()

  const newSuggestion = useSelector((state: AppState) => state.editSuggestion)
  const suggestion = useSelector((state: AppState) => state.editSuggestion.suggestion)
  const activeArea = useSelector((state: AppState) => state.editSuggestion.activeArea)
  const deletedInstruments = useSelector(
    (state: AppState) => state.editSuggestion.deletedInstrumentUuids
  )

  //If the user visits a new edit page, clear the previously edited from redux
  if (props.suggestion.id !== newSuggestion.lastEditedUuid) {
    const suggestionInstruments: NewSuggestionInstrument[] = []
    props.suggestion.suggestion_instruments.forEach((element) => {
      suggestionInstruments.push({
        id: element.id,
        description: element.description || "",
        instrument: element.instrument,
      })
    })

    dispatch(
      updateEditSuggestion({
        artist: props.suggestion.artist,
        link: props.suggestion.link,
        motivation: props.suggestion.motivation,
        title: props.suggestion.title,
        instruments: suggestionInstruments,
      })
    )

    dispatch(updateLastDeletedInstrumentUuid([]))

    dispatch(updateLastEditedUuid(props.suggestion.id))
  }

  const saveSuggestion = (onSuccess: () => void, onError: () => void) => {
    if (user) {
      updateSuggestion(supabase, suggestion, newSuggestion.lastEditedUuid ?? "")
        .then((response) => {
          if (response.error) {
            onError()
            return
          }

          const suggestionId = response.data.at(0)!.id
          updateSuggestionInstruments(supabase, mapEditInstruments(suggestion, suggestionId))
            .then((response) => {
              if (response.error) {
                onError()
                return
              }

              deleteSuggestionInstruments(supabase, deletedInstruments)
                .then((response) => {
                  router.push(`/suggestions/${suggestionId}`).then(() => {
                    onSuccess()
                    dispatch(setActiveArea(Area.SongInformation))
                    dispatch(updateLastEditedUuid(""))
                    dispatch(updateLastDeletedInstrumentUuid([]))
                  })
                })
                .catch(() => {
                  onError()
                })
            })
            .catch(() => {
              onError()
            })
        })
        .catch(() => {
          onError()
        })
    } else {
      onError()
    }
  }

  const onAreaSelect = (area: Area) => {
    dispatch(setActiveArea(area))
  }

  const onInstrumentSubmit = (newInstruments: NewSuggestionInstrument[]) => {
    //Add deleted entries to redux to remove on submit.
    const oldIds = newInstruments.map((item) => item.id)
    const newIds = suggestion.instruments.map((item) => item.id)
    const missingIds = newIds.filter((id) => !oldIds.includes(id)) as string[]
    dispatch(updateLastDeletedInstrumentUuid([...deletedInstruments, ...missingIds]))

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
      onAreaSelect={onAreaSelect}
      onInstrumentSubmit={(newInstruments) => {
        onInstrumentSubmit(newInstruments)
      }}
      onCloseClicked={() => {
        router.push(`/suggestions/${props.suggestion.id}`)
      }}
      onReviewSubmit={(success, error) => saveSuggestion(success, error)}
    />
  )
}

export default EditSuggestionPage
