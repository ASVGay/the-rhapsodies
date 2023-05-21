import React, { useState } from "react"
import { InstrumentItem } from "./edit/instruments-edit-item"
import InstrumentsEdit from "./edit/instruments-edit"
import InstrumentSearch from "@/components/search/instrument/instrument-search"
import { Instrument } from "@/constants/instruments"

interface InstrumentsAreaProps {}

const InstrumentsArea = ({}: InstrumentsAreaProps) => {
  const [instrumentItems, setInstrumentItems] = useState<InstrumentItem[]>([])

  const onInstrumentSelected = (instrument: Instrument): boolean => {
    const newItem: InstrumentItem = {
      instrument: instrument,
      note: "",
    }
    setInstrumentItems([newItem, ...instrumentItems])
    return true
  }

  const onDeleteInstrument = (instrumentItem: InstrumentItem): boolean => {
    setInstrumentItems(
      instrumentItems.filter((item) => item.instrument !== instrumentItem.instrument)
    )
    return true
  }

  return (
    <div data-cy="area-instruments">
      <h2 className={"area-header"}>Instruments</h2>
      <InstrumentSearch
        onInstrumentSelected={(instrument: Instrument) => onInstrumentSelected(instrument)}
      />
      <InstrumentsEdit items={instrumentItems} onDeleteClick={onDeleteInstrument} />
      <button className="btn" onClick={() => {}}>
        To Review
      </button>
    </div>
  )
}

export default InstrumentsArea
