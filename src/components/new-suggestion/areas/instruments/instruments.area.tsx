import React from "react"
import InstrumentsList from "./list/instruments-list"
import InstrumentSearch from "@/components/new-suggestion/areas/instruments/search/instrument-search"
import { Instrument } from "@/types/database-types"
import { setActiveArea, updateNewSuggestion } from "@/redux/slices/new-suggestion.slice"
import { AppDispatch } from "@/redux/store"
import { useDispatch } from "react-redux"
import { NewSuggestion, NewSuggestionInstrument } from "@/interfaces/new-suggestion"
import { Area } from "@/constants/area"

interface InstrumentsAreaProps {
  instrumentList: Instrument[]
  suggestion: NewSuggestion
}

const InstrumentsArea = ({ instrumentList, suggestion }: InstrumentsAreaProps) => {
  const dispatch: AppDispatch = useDispatch()

  const onInstrumentSelected = (instrument: Instrument): boolean => {
    const newItem: NewSuggestionInstrument = {
      instrument: instrument,
      description: "",
    }

    dispatch(
      updateNewSuggestion({
        ...suggestion,
        instruments: [...suggestion.instruments, newItem],
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
        instruments={instrumentList}
        onInstrumentSelected={(instrument: Instrument) => onInstrumentSelected(instrument)}
      />
      <InstrumentsList />
      <button
        data-cy="to-review-button"
        disabled={suggestion.instruments.length < 1}
        className="btn"
        onClick={onSubmit}
      >
        To Review
      </button>
    </div>
  )
}

export default InstrumentsArea
