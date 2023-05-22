import React, { useEffect, useState } from "react"
import InstrumentsEdit from "./edit/instruments-edit"
import InstrumentSearch from "@/components/search/instrument/instrument-search"
import { Instrument } from "@/types/database-types"
import { setActiveArea, updateNewSuggestion } from "@/redux/slices/new-suggestion.slice"
import { AppDispatch, AppState } from "@/redux/store"
import { useDispatch, useSelector } from "react-redux"
import { NewSuggestionInstrument } from "@/interfaces/new-suggestion"
import { Area } from "@/constants/area"

interface InstrumentsAreaProps {
  instruments: Instrument[]
}

const InstrumentsArea = ({ instruments }: InstrumentsAreaProps) => {
  const dispatch: AppDispatch = useDispatch()
  const newSuggestion = useSelector((state: AppState) => state.newSuggestion.suggestion)
  const [canProceed, setCanProceed] = useState<boolean>(newSuggestion.instruments.length > 0)

  useEffect(() => {
    setCanProceed(newSuggestion.instruments.length > 0)
  }, [newSuggestion])

  const onInstrumentSelected = (instrument: Instrument): boolean => {
    const newItem: NewSuggestionInstrument = {
      instrument: instrument,
      description: "",
    }

    dispatch(
      updateNewSuggestion({
        ...newSuggestion,
        instruments: [...newSuggestion.instruments, newItem],
      })
    )
    return true
  }

  const onSubmit = () => {
    dispatch(setActiveArea(Area.Review))
  }

  return (
    <div data-cy="area-instruments">
      <h2 className={"area-header"}>Instruments</h2>
      <InstrumentSearch
        instruments={instruments}
        onInstrumentSelected={(instrument: Instrument) => onInstrumentSelected(instrument)}
      />
      <InstrumentsEdit />
      <button disabled={!canProceed} className="btn" onClick={onSubmit}>
        To Review
      </button>
    </div>
  )
}

export default InstrumentsArea
