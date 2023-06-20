import React, { useState } from "react"
import Spinner from "@/components/utils/spinner"
import ErrorPopup from "@/components/popups/error-popup"
import Instrument from "@/components/suggestion/instrument"
import { ISuggestion } from "@/interfaces/suggestion"
import SuggestionLink from "@/components/suggestion/song-information/suggestion-link"
import SongImage from "@/components/images/song-image"

interface ReviewAreaProps {
  newSuggestion: ISuggestion
  onSubmit(onSuccess: () => void, onError: () => void): void
}

const ReviewArea = ({ newSuggestion: suggestion, onSubmit }: ReviewAreaProps) => {
  const [showSpinner, setShowSpinner] = useState<boolean>(false)
  const [insertError, setInsertError] = useState<boolean>(false)

  const handleError = () => {
    setInsertError(true)
    setShowSpinner(false)
  }

  const handleSuccess = () => setShowSpinner(false)

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
              <SongImage url={suggestion.image}/>
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
                />
              )
            })}
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
