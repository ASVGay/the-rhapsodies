import React, { useState } from "react"
import InstrumentsEdit from "./edit/instruments-edit"
import InstrumentSearch from "@/components/search/instrument/instrument-search"
import { Instrument } from "@/types/database-types"
import { updateNewSuggestion } from "@/redux/slices/new-suggestion.slice"
import { AppDispatch, AppState } from "@/redux/store"
import { useDispatch, useSelector } from "react-redux"
import { NewSuggestionInstrument } from "@/interfaces/new-suggestion"

interface InstrumentsAreaProps {
  instruments: Instrument[]
}

const InstrumentsArea = ({ instruments }: InstrumentsAreaProps) => {
  const [instrumentItems, setInstrumentItems] = useState<NewSuggestionInstrument[]>([])
  const dispatch: AppDispatch = useDispatch()
  const newSuggestion = useSelector((state: AppState) => state.newSuggestion.suggestion)

  const onInstrumentSelected = (instrument: Instrument): boolean => {
    const newItem: NewSuggestionInstrument = {
      instrument: instrument,
      description: "",
    }
    setInstrumentItems([newItem, ...instrumentItems])
    return true
  }

  const onDeleteInstrument = (instrumentItem: NewSuggestionInstrument): boolean => {
    setInstrumentItems(
      instrumentItems.filter((item) => item.instrument !== instrumentItem.instrument)
    )
    return true
  }

  const onSubmit = () => {
    dispatch(
      updateNewSuggestion({
        ...newSuggestion,
        instruments: instrumentItems,
      })
    )
    // dispatch(setActiveArea(Area.Review))
    console.log("pressed")
  }

  return (
    <div data-cy="area-instruments">
      <h2 className={"area-header"}>Instruments</h2>
      <InstrumentSearch
        instruments={instruments}
        onInstrumentSelected={(instrument: Instrument) => onInstrumentSelected(instrument)}
      />
      <InstrumentsEdit items={instrumentItems} onDeleteClick={onDeleteInstrument} />
      <button disabled={instrumentItems.length < 1} className="btn" onClick={onSubmit}>
        To Review
      </button>
    </div>
  )
}

export default InstrumentsArea
