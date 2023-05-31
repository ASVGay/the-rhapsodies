import React, { useState } from "react"
import Spinner from "@/components/utils/spinner"
import { MusicalNoteIcon } from "@heroicons/react/24/solid"
import ErrorPopup from "@/components/popups/error-popup"
import { NewSuggestion, NewSuggestionInstrument } from "@/interfaces/new-suggestion"
import { getInstrumentImage } from "@/helpers/cloudinary.helper"
import Image from "next/image"

interface ReviewAreaProps {
  suggestion: NewSuggestion
  onSubmit(onSuccess: () => void, onError: () => void): void
}

const ReviewArea = ({ suggestion, onSubmit }: ReviewAreaProps) => {
  const [showSpinner, setShowSpinner] = useState<boolean>(false)
  const [insertError, setInsertError] = useState<boolean>(false)

  const handleError = () => {
    setInsertError(true)
    setShowSpinner(false)
  }

  const handleSuccess = () => {
    setShowSpinner(false)
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
              className={"mb-3 mt-3 line-clamp-3 h-12 text-sm font-medium leading-4 text-gray-400"}
              data-cy="review-motivation"
            >
              {suggestion.motivation}
            </p>
          </div>

          <p className={"mb-4 text-center text-lg text-moon-400"}>Instruments</p>
          <div className={"mb-12 grid justify-center gap-6 text-left"} data-cy="review-instruments">
            {suggestion.instruments.map(
              ({ instrument, description }: NewSuggestionInstrument, index) => {
                const key = `${instrument.id}-${index}`
                return (
                  <div key={key} className={"flex select-none"}>
                    <Image
                      src={getInstrumentImage(instrument.image_source)}
                      alt={instrument.instrument_name}
                      width={64}
                      height={64}
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
          </div>

          <div className={`flex justify-center`}>
            <button
              onClick={() => {
                setShowSpinner(true)
                onSubmit(handleSuccess, handleError)
              }}
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
