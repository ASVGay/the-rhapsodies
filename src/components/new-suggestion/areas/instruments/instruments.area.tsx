import React from "react"
import InstrumentsList from "./edit/instruments-list"
import InstrumentSearch from "@/components/search/instrument/instrument-search"
import { Instrument } from "@/types/database-types"
import { setActiveArea, updateNewSuggestion } from "@/redux/slices/new-suggestion.slice"
import { AppDispatch, AppState } from "@/redux/store"
import { useDispatch, useSelector } from "react-redux"
import { NewSuggestionInstrument } from "@/interfaces/new-suggestion"
import { Area } from "@/constants/area"
import { isInstrumentSuggestionInvalid } from "@/helpers/new-suggestion.helper"

interface InstrumentsAreaProps {
  instrumentList: Instrument[]
}

const InstrumentsArea = ({ instrumentList }: InstrumentsAreaProps) => {
  const dispatch: AppDispatch = useDispatch()
  const newSuggestion = useSelector((state: AppState) => state.newSuggestion.suggestion)

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
    isInstrumentSuggestionInvalid(newSuggestion.instruments)
    dispatch(setActiveArea(Area.Review))
  }

  return (
    <div data-cy="area-instruments">
      <h2 className={"area-header"}>Instruments</h2>
      <InstrumentSearch
        instruments={instrumentList}
        onInstrumentSelected={(instrument: Instrument) => onInstrumentSelected(instrument)}
      />
      <InstrumentsList />
      <button
        data-cy="to-review-button"
        disabled={newSuggestion.instruments.length < 1}
        className="btn"
        onClick={onSubmit}
      >
        To Review
      </button>
    </div>
  )
}

export default InstrumentsArea
