import React, { useEffect, useState } from "react"
import { XMarkIcon, ArrowPathIcon } from "@heroicons/react/24/outline"
import ProgressBar from "@/components/suggestion/progress-bar/progress-bar"
import SongInformationArea from "@/components/suggestion/areas/song-information.area"
import ReviewArea from "@/components/suggestion/areas/review.area"
import { Area } from "@/constants/area"
import { FormProvider, useForm } from "react-hook-form"
import { InputsSongInformation, ISuggestion, ISuggestionInstrument } from "@/interfaces/suggestion"
import InstrumentsArea from "@/components/suggestion/areas/instruments/instruments.area"
import { Database } from "@/types/database"
import { Instrument } from "@/types/database-types"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { getInstruments } from "@/services/instrument.service"
import Spinner from "@/components/utils/spinner"
import ErrorPopup from "@/components/popups/error-popup"
import { submitSongInformationForm } from "@/helpers/new-suggestion.helper"

interface SuggestionPageSectionProps {
  title: string
  newSuggestion: ISuggestion
  currentArea: Area
  onCloseClicked(): void
  onClearClicked?(): void
  onSongInformationSubmit(songInformation: InputsSongInformation): void
  onInstrumentSubmit(newInstruments: ISuggestionInstrument[]): void
  onAreaSelect(newArea: Area): void
  onReviewSubmit(onSuccess: () => void, onError: () => void): void
}

const SuggestionPageSection = ({
  title,
  newSuggestion,
  currentArea,
  onReviewSubmit,
  onAreaSelect,
  onCloseClicked,
  onClearClicked,
  onInstrumentSubmit,
  onSongInformationSubmit,
}: SuggestionPageSectionProps) => {
  const supabaseClient = useSupabaseClient<Database>()
  const [showSpinner, setShowSpinner] = useState<boolean>(false)
  const [showLoadingError, setShowLoadingError] = useState<boolean>(false)

  const methods = useForm<InputsSongInformation>({
    defaultValues: {
      ...newSuggestion,
      artist: newSuggestion.artist.join(","),
    } as InputsSongInformation,
    shouldFocusError: false,
  })

  const [instrumentList, setInstrumentList] = useState<Instrument[]>([])

  useEffect(() => {
    setShowSpinner(true)
    getInstruments(supabaseClient)
      .then((response) => {
        if (response.error || response.data?.length === 0) {
          setShowLoadingError(true)
          return
        }

        setInstrumentList(response.data as Instrument[])
      })
      .catch(() => {
        setShowLoadingError(true)
      })
      .finally(() => {
        setShowSpinner(false)
      })
  }, [supabaseClient])

  const handleAreaChange = (area: Area) => {
    submitSongInformationForm()
    onSongInformationSubmit(methods.getValues())

    if (area !== Area.Instruments) onInstrumentSubmit(newSuggestion.instruments)

    onAreaSelect(area)
  }

  return (
    <FormProvider {...methods}>
      <div className={"page-wrapper"}>
        <div className={"flex justify-between"}>
          <div className={"page-header"}>{title}</div>
          <div className={"flex flex-row gap-2"}>
            {onClearClicked && (
              <ArrowPathIcon
                className={"h-8 w-8 cursor-pointer text-black hover:text-zinc-400"}
                data-cy="suggestion-clear-icon"
                onClick={onClearClicked}
              />
            )}
            <XMarkIcon
              data-cy={"button-discard-new-suggestion"}
              className={"h-8 w-8 cursor-pointer text-black hover:text-red-500"}
              onClick={onCloseClicked}
            />
          </div>
        </div>

        {showSpinner && (
          <div className={"h-[75vh] text-center"} data-cy="suggestions-spinner">
            <Spinner size={10} />
          </div>
        )}
        {showLoadingError ? (
          <div className={"mt-6"} data-cy="failed-fetching-instruments">
            <ErrorPopup
              text={`“Something went wrong”
            You can try again. Contact support if this error persists.`}
              closePopup={() => {}}
            />
          </div>
        ) : (
          <div className={"mx-auto text-center lg:w-2/4"}>
            <ProgressBar
              activeArea={currentArea}
              newSuggestionInstruments={newSuggestion.instruments}
              onAreaSelect={(area) => handleAreaChange(area)}
            />
            {currentArea == Area.SongInformation && (
              <SongInformationArea
                onFormSuccess={onSongInformationSubmit}
                proceedToNextArea={() => handleAreaChange(Area.Instruments)}
                newSuggestion={newSuggestion}
              />
            )}
            {currentArea == Area.Instruments && (
              <InstrumentsArea
                onInstrumentsChanged={onInstrumentSubmit}
                newSuggestionInstruments={newSuggestion.instruments}
                instrumentList={instrumentList}
                onSubmit={() => handleAreaChange(Area.Review)}
              />
            )}
            {currentArea == Area.Review && (
              <ReviewArea newSuggestion={newSuggestion} onSubmit={onReviewSubmit} />
            )}
          </div>
        )}
      </div>
    </FormProvider>
  )
}

export default SuggestionPageSection
