import React, { useEffect, useState } from "react"
import { XMarkIcon } from "@heroicons/react/24/outline"
import ProgressBar from "@/components/new-suggestion/progress-bar/progress-bar"
import { useRouter } from "next/router"
import SongInformationArea from "@/components/new-suggestion/areas/song-information.area"
import ReviewArea from "@/components/new-suggestion/areas/review.area"
import { Area } from "@/constants/area"
import { FormProvider, useForm } from "react-hook-form"
import {
  InputsSongInformation,
  NewSuggestion,
  NewSuggestionInstrument,
} from "@/interfaces/new-suggestion"
import InstrumentsArea from "@/components/new-suggestion/areas/instruments/instruments.area"
import { Database } from "@/types/database"
import { Instrument } from "@/types/database-types"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { getInstruments } from "@/services/instrument.service"
import Spinner from "@/components/utils/spinner"
import ErrorPopup from "@/components/popups/error-popup"
import { submitSongInformationForm } from "@/helpers/new-suggestion.helper"

interface SuggestionPageSectionProps {
  title: string
  newSuggestion: NewSuggestion
  startingArea: Area
  onCloseClicked(): void
  onSongInformationSubmit?(songInformation: InputsSongInformation): void
  onInstrumentSubmit?(newInstruments: NewSuggestionInstrument[]): void
  onAreaSelect?(newArea: Area): void
  onReviewSubmit(onSuccess: () => void, onError: () => void): void
}

const SuggestionPageSection = ({
  title,
  newSuggestion,
  startingArea,
  onReviewSubmit,
  onAreaSelect,
  onCloseClicked,
  onInstrumentSubmit,
  onSongInformationSubmit,
}: SuggestionPageSectionProps) => {
  const [activeArea, setActiveArea] = useState<Area>(startingArea)
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
  const [newSuggestionInstruments, setNewSuggestionInstruments] = useState<
    NewSuggestionInstrument[]
  >(newSuggestion.instruments)

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
    if (onAreaSelect) onAreaSelect(area)

    submitSongInformationForm()
    if (onSongInformationSubmit) {
      onSongInformationSubmit(methods.getValues())
    }

    if (area !== Area.Instruments)
      if (onInstrumentSubmit) onInstrumentSubmit(newSuggestionInstruments)

    setActiveArea(area)
  }

  return (
    <FormProvider {...methods}>
      <div className={"page-wrapper"}>
        <div className={"flex justify-between"}>
          <div className={"page-header"}>{title}</div>
          <XMarkIcon
            data-cy={"button-discard-new-suggestion"}
            className={"h-8 w-8 cursor-pointer text-zinc-400 hover:text-red-500"}
            onClick={onCloseClicked}
          />
        </div>

        {showSpinner && (
          <div className={"h-[75vh] text-center"} data-cy="suggestions-spinner">
            <Spinner size={10} />
          </div>
        )}
        {showLoadingError && (
          <div className={"mt-6"} data-cy="failed-fetching-instruments">
            <ErrorPopup
              text={`“Something went wrong”
            You can try again. Contact support if this error persists.`}
              closePopup={() => {}}
            />
          </div>
        )}
        {!showLoadingError && (
          <div className={"mx-auto text-center lg:w-2/4"}>
            <ProgressBar
              activeArea={activeArea}
              newSuggestionInstruments={newSuggestionInstruments}
              onAreaSelect={(area) => handleAreaChange(area)}
            />
            {activeArea == Area.SongInformation && (
              <SongInformationArea
                onFormSuccess={(songInformation) => {
                  if (onSongInformationSubmit) onSongInformationSubmit(songInformation)
                }}
                proceedToNextArea={() => handleAreaChange(Area.Instruments)}
              />
            )}
            {activeArea == Area.Instruments && (
              <InstrumentsArea
                onInstrumentsChanged={setNewSuggestionInstruments}
                newSuggestionInstruments={newSuggestionInstruments}
                instrumentList={instrumentList}
                onSubmit={() => {
                  handleAreaChange(Area.Review)
                }}
              />
            )}
            {activeArea == Area.Review && (
              <ReviewArea newSuggestion={newSuggestion} onSubmit={onReviewSubmit} />
            )}
          </div>
        )}
      </div>
    </FormProvider>
  )
}

export default SuggestionPageSection
