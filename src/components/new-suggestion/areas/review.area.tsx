import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppState } from "@/redux/store"
import Spinner from "@/components/utils/spinner"
import { MusicalNoteIcon } from "@heroicons/react/24/solid"
import { ReviewPlaceholder } from "@/constants/review-placeholder"
import { insertSuggestion, insertSuggestionInstruments } from "@/services/suggestion.service"
import ErrorPopup from "@/components/popups/error-popup"
import { SuggestionInstrumentDatabaseOperation } from "@/types/database-types"
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { Database } from "@/types/database"
import { useRouter } from "next/router"
import { initialState, setActiveArea, updateNewSuggestion } from "@/redux/slices/new-suggestion.slice"
import { Area } from "@/constants/area"
import { NewSuggestionInstrument } from "@/interfaces/new-suggestion"
import { getInstrumentImage } from "@/helpers/cloudinary.helper"
import Image from "next/image"

const ReviewArea = () => {
  const supabase = useSupabaseClient<Database>()
  const suggestion = useSelector((state: AppState) => state.newSuggestion.suggestion)
  const [showSpinner, setShowSpinner] = useState<boolean>(false)
  const [insertError, setInsertError] = useState<boolean>(false)
  const dispatch = useDispatch()
  const router = useRouter()
  const user = useUser()

  const saveSuggestion = () => {
    setShowSpinner(true)
    insertSuggestion(supabase, suggestion, user!.id)
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

            dispatch(updateNewSuggestion(initialState.suggestion))
            dispatch(setActiveArea(Area.SongInformation))
            router.push("/suggestions")
          })
          .catch(() => handleError())
      })
      .catch(() => handleError())
      .finally(() => {
        setShowSpinner(false)
      })
  }

  const handleError = () => {
    setInsertError(true)
    setShowSpinner(false)
  }

  const mapInstruments = (suggestionId: string): SuggestionInstrumentDatabaseOperation[] => {
    return suggestion.instruments.map(({ instrument, description }) => {
      return ({ suggestion_id: suggestionId, instrument_id: instrument.id, description: description })
    })
  }

  const requiredDataIsPresent = () => {
    return suggestion.artist.length > 0
      && suggestion.motivation.length > 0
      && suggestion.title.length > 0
      && suggestion.instruments.length > 0
  }

  const btnCss = () => requiredDataIsPresent()
    ? "bg-moon-500 cursor-pointer"
    : "bg-moon-100 cursor-not-allowed hover:bg-moon-100"

  return (
    <div data-cy="area-review">
      <h2 className={"area-header"}>Review</h2>
      {showSpinner
        ? (
          <div className={"h-[75vh] text-center"} data-cy="suggestions-spinner">
            <Spinner size={10} />
          </div>
        )
        : (<>
          <div className={"m-2 md:ml-auto md:mr-auto md:max-w-sm"}>
            <div className={"flex"}>
              <MusicalNoteIcon className={"h-14 w-14 rounded-md bg-neutral-200 p-2 text-black"} />
              <div className={"ml-3"}>
               <span data-cy="review-title">
                 {suggestion.title.length > 0
                   ? <p className={"line-clamp-1 font-bold"}>{suggestion.title}</p>
                   : <p className={"text-zinc-300"}>{ReviewPlaceholder.title}</p>
                 }
               </span>
                <span data-cy="review-artists">
                  {suggestion.artist.length > 0
                    ? <p className={"line-clamp-1 text-left"}>{suggestion.artist.join(", ")}</p>
                    : <p className={"text-zinc-300"}>{ReviewPlaceholder.artist}</p>
                  }
                </span>
              </div>
            </div>
            <p className={"mb-3 mt-3 line-clamp-3 h-12 text-sm leading-4 text-gray-400"} data-cy="review-motivation">
              {suggestion.motivation.length > 0
                ? suggestion.motivation
                : ReviewPlaceholder.motivation
              }
            </p>
          </div>

          <p className={"text-center text-lg font-medium text-moon-200 mb-4"}>Instruments</p>
          <div className={"grid gap-6 mb-12 justify-center"} data-cy="review-instruments">
            {suggestion.instruments.map(({ instrument, description }: NewSuggestionInstrument, index) => {
                return (
                  <div key={index} className={"flex select-none"}>
                    <Image
                      src={getInstrumentImage(instrument.image_source)}
                      alt={instrument.instrument_name}
                      width={64} height={64}
                      className={"mr-4 h-10 w-10"}
                      draggable={"false"}
                    />
                    <div>
                      <p className={"text-left"}>{instrument.instrument_name}</p>
                      <p className={"leading-5 text-zinc-400 md:max-w-[12rem]"}>{description}</p>
                    </div>
                  </div>
                )
              }
            )}
            {suggestion.instruments.length == 0 && (
              <p className={"text-sm leading-4 text-gray-400"}>{ReviewPlaceholder.instruments}</p>
            )}
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
        </>)
      }
    </div>
  )
}

export default ReviewArea
