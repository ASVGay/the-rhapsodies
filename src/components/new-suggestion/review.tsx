import { useDispatch, useSelector } from "react-redux"
import { AppState } from "@/redux/store"
import Image from "next/image"
import {
  getInstrumentImage,
  insertSuggestion,
  insertSuggestionInstruments
} from "@/services/suggestion.service"
import { MusicalNoteIcon } from "@heroicons/react/24/solid"
import { NewInstrument } from "@/interfaces/new-suggestion"
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { Database } from "@/types/database"
import { initialState, setActiveArea, updateNewSuggestion } from "@/redux/slices/new-suggestion.slice"
import { Area } from "@/constants/area"
import { useRouter } from "next/router"
import { SuggestionInstrumentDatabaseOperation } from "@/types/database-types"
import Spinner from "@/components/utils/spinner"
import React, { useState } from "react"
import ErrorPopup from "@/components/popups/error-popup"

const Review = () => {
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

      })
      .catch(() => handleError())
      .finally(() => {
        setShowSpinner(false)
      })
  }

  const handleError = () => {
    setInsertError(true)
  }

  const mapInstruments = (suggestionId: string): SuggestionInstrumentDatabaseOperation[] => {
    return suggestion.instruments.map(({ id, note }) => {
      return ({ suggestion_id: suggestionId, instrument_id: id, description: note })
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
    <div>
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
                {suggestion.title.length > 0
                  ? <p className={"line-clamp-1 font-bold"}>{suggestion.title}</p>
                  : <p className={"text-zinc-300"}>Unknown</p>
                }
                {suggestion.artist.length > 0
                  ? <p className={"line-clamp-1"}>{suggestion.artist.join(", ")}</p>
                  : <p className={"text-zinc-300"}>Unknown</p>
                }
              </div>
            </div>
            <p className={"mb-3 mt-3 line-clamp-3 h-12 text-sm leading-4 text-gray-400"}>
              {suggestion.motivation.length > 0
                ? suggestion.motivation
                : "Please provide a description of why you'd like to suggest this song."
              }
            </p>
          </div>

          <p className={"text-center text-lg font-medium text-moon-200 mb-4"}>Instruments</p>
          <div className={"grid gap-6 mb-12 justify-center"}>
            {suggestion.instruments.map(({ id, name, image, note }: NewInstrument, index) => {
                return (
                  <div key={index} className={"flex select-none"}>
                    <Image
                      src={getInstrumentImage(image)}
                      alt={name}
                      width={64}
                      height={64}
                      className={"mr-4 h-10 w-10"}
                      draggable={"false"}
                    />
                    <div>
                      <p className={"text-left"}>{name}</p>
                      <p className={"leading-5 text-zinc-400 md:max-w-[12rem]"}>{note}</p>
                    </div>
                  </div>
                )
              }
            )}
            {suggestion.instruments.length == 0 && (
              <p className={"text-sm leading-4 text-gray-400"}>
                No instruments have been selected yet..
              </p>
            )}
          </div>

          <div className={`flex justify-center`}>
            <button onClick={() => saveSuggestion()} disabled={!requiredDataIsPresent()}
                    className={`btn ${btnCss()}`}
            >
              Submit Suggestion
            </button>
          </div>

          {insertError && (
            <div className={"mt-6"}>
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

export default Review