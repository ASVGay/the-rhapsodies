import React, { useEffect, useState } from "react"
import { XMarkIcon } from "@heroicons/react/24/outline"
import ProgressBar from "@/components/new-suggestion/progress-bar/progress-bar"
import { useRouter } from "next/router"
import SongInformationArea from "@/components/new-suggestion/areas/song-information.area"
import ReviewArea from "@/components/new-suggestion/areas/review.area"
import { Area } from "@/constants/area"
import { useSelector } from "react-redux"
import { AppState } from "@/redux/store"
import { FormProvider, useForm } from "react-hook-form"
import { InputsSongInformation, NewSuggestion } from "@/interfaces/new-suggestion"
import InstrumentsArea from "@/components/new-suggestion/areas/instruments/instruments.area"
import { Database } from "@/types/database"
import { Instrument } from "@/types/database-types"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { getInstruments } from "@/services/instrument.service"
import Spinner from "@/components/utils/spinner"
import ErrorPopup from "@/components/popups/error-popup"

interface SuggestionPageSectionProps {
  title: string
  suggestion: NewSuggestion
}

const SuggestionPageSection = ({ title, suggestion }: SuggestionPageSectionProps) => {
  const router = useRouter()
  const activeArea = useSelector((state: AppState) => state.newSuggestion.activeArea)

  const methods = useForm<InputsSongInformation>({
    defaultValues: { ...suggestion, artist: suggestion.artist.join(",") } as InputsSongInformation,
    shouldFocusError: false,
  })

  const supabaseClient = useSupabaseClient<Database>()
  const [instrumentList, setInstrumentList] = useState<Instrument[]>([])
  const [showSpinner, setShowSpinner] = useState<boolean>(false)
  const [showLoadingError, setShowLoadingError] = useState<boolean>(false)

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

  return (
    <FormProvider {...methods}>
      <div className={"page-wrapper"}>
        <div className={"flex justify-between"}>
          <div className={"page-header"}>{title}</div>
          <XMarkIcon
            data-cy={"button-discard-new-suggestion"}
            className={"h-8 w-8 cursor-pointer text-zinc-400 hover:text-red-500"}
            onClick={() => router.push("/suggestions")}
          />
        </div>

        {showSpinner && (
          <div className={"h-[75vh] text-center"} data-cy="suggestions-spinner">
            <Spinner size={10} />
          </div>
        )}
        {showLoadingError && (
          <div className={"mt-6"} data-cy="failed-fetching-suggestions">
            <ErrorPopup
              text={`“Something went wrong”
            You can try again. Contact support if this error persists.`}
              closePopup={() => {}}
            />
          </div>
        )}
        {!showLoadingError && (
          <div className={"mx-auto text-center lg:w-2/4"}>
            <ProgressBar />
            {activeArea == Area.SongInformation && <SongInformationArea suggestion={suggestion} />}
            {activeArea == Area.Instruments && (
              <InstrumentsArea suggestion={suggestion} instrumentList={instrumentList} />
            )}
            {activeArea == Area.Review && <ReviewArea suggestion={suggestion} />}
          </div>
        )}
      </div>
    </FormProvider>
  )
}

export default SuggestionPageSection
