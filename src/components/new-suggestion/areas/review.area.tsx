import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppState } from "@/redux/store"
import Spinner from "@/components/utils/spinner"
import { MusicalNoteIcon } from "@heroicons/react/24/solid"
import { insertSuggestion, insertSuggestionInstruments } from "@/services/suggestion.service"
import ErrorPopup from "@/components/popups/error-popup"
import { SongInstrumentDatabaseOperation } from "@/types/database-types"
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { Database } from "@/types/database"
import { useRouter } from "next/router"
import {
  initialState,
  setActiveArea,
  updateNewSuggestion,
} from "@/redux/slices/new-suggestion.slice"
import { Area } from "@/constants/area"
import SuggestionLink from "@/components/suggestion/song-information/suggestion-link"
import Instrument from "@/components/suggestion/instrument"

const ReviewArea = () => {
  const supabase = useSupabaseClient<Database>()
  const suggestion = useSelector((state: AppState) => state.newSuggestion.suggestion)
  const [showSpinner, setShowSpinner] = useState<boolean>(false)
  const [insertError, setInsertError] = useState<boolean>(false)
  const dispatch = useDispatch()
  const router = useRouter()
  const user = useUser()
  const uid = user?.id

  const saveSuggestion = () => {
    if (user) {
      setShowSpinner(true)
      insertSuggestion(supabase, suggestion, user.id)
        .then((response) => {
          if (response.error) {
            handleError()
            return
          }

          const suggestionId = response.data.at(0)!.id
          insertSuggestionInstruments(supabase, mapInstruments(suggestionId))
            .then((response) => {
              if (response.error) {
                handleError()
                return
              }

              router.push("/suggestions").then(() => {
                setShowSpinner(false)
                dispatch(updateNewSuggestion(initialState.suggestion))
                dispatch(setActiveArea(Area.SongInformation))
              })
            })
            .catch(() => handleError())
        })
        .catch(() => handleError())
    } else {
      handleError()
    }
  }

  const handleError = () => {
    setInsertError(true)
    setShowSpinner(false)
  }

  const mapInstruments = (suggestionId: string): SongInstrumentDatabaseOperation[] => {
    return suggestion.instruments.map(({ instrument, description }) => {
      return { song_id: suggestionId, instrument_id: instrument.id, description: description }
    })
  }

  const requiredDataIsPresent = () => {
    return (
      suggestion.artist.length > 0 &&
      suggestion.motivation.length > 0 &&
      suggestion.title.length > 0 &&
      suggestion.instruments.length > 0
    )
  }

  const btnCss = () =>
    requiredDataIsPresent()
      ? "bg-moon-500 cursor-pointer"
      : "bg-moon-100 cursor-not-allowed hover:bg-moon-100"

  return (
    <div data-cy="area-review">
      <h2 className={"area-header"}>Review</h2>
      {showSpinner ? (
        <div className={"h-[75vh] text-center"} data-cy="suggestions-spinner">
          <Spinner size={10} />
        </div>
      ) : (
        <>
          <div className={"m-2 text-left md:ml-auto md:mr-auto md:max-w-sm"}>
            <div className={"flex"}>
              <MusicalNoteIcon className={"h-14 w-14 rounded-md bg-neutral-200 p-2 text-black"} />
              <div className={"ml-3"}>
                <span data-cy="review-title">
                  <p className={"line-clamp-1 font-bold"}>{suggestion.title}</p>
                </span>
                <span data-cy="review-artists">
                  <p className={"line-clamp-1"}>{suggestion.artist.join(", ")}</p>
                </span>
              </div>
            </div>
            <p
              className={"mb-3 mt-3 text-sm font-medium leading-4 text-gray-400"}
              data-cy="review-motivation"
            >
              {suggestion.motivation}
            </p>
            <SuggestionLink link={suggestion.link} dataCy={"review-link"} />
          </div>

          <p className={"mb-4 text-center text-lg text-moon-400"}>Instruments</p>
          <div className={"mb-12 grid justify-center gap-6 text-left"} data-cy="review-instruments">
            {suggestion.instruments.map((instrument, index) => {
              const key = `${instrument.instrument.id}-${index}`
              return (
                <Instrument
                  key={key}
                  imageURL={instrument.instrument.image_source}
                  name={instrument.instrument.instrument_name}
                  description={instrument.description}
                  uid={uid}
                />
              )
            })}
          </div>

          <div className={`flex justify-center`}>
            <button
              onClick={() => saveSuggestion()}
              disabled={!requiredDataIsPresent()}
              className={`btn ${btnCss()}`}
              data-cy="submit-suggestion-btn"
            >
              Submit Suggestion
            </button>
          </div>

          {insertError && (
            <div className={"mt-6"} data-cy="new-suggestion-insert-error">
              <ErrorPopup
                text={"Failed to save suggestion."}
                closePopup={() => setInsertError(false)}
              />
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default ReviewArea
