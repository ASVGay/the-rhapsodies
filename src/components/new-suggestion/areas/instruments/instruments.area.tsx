import MainButton from "@/components/buttons/main-button"
import InstrumentSearch from "@/components/search/instrument/instrument-search"
import { Instrument } from "@/constants/instruments"
import React, { useState } from "react"
import InstrumentsEdit from "./edit/instruments-edit"
import { InstrumentItem } from "./edit/instruments-edit-item"

interface InstrumentsAreaProps {
  show: boolean
}

const InstrumentsArea = ({ show }: InstrumentsAreaProps) => {
  const [instrumentItems, setInstrumentItems] = useState<InstrumentItem[]>([])

  const onInstrumentSelected = (instrument: Instrument): boolean => {
    const newItem: InstrumentItem = {
      instrument: instrument,
      note: "",
    }
    setInstrumentItems([newItem, ...instrumentItems])
    return true
  }

  return (
    <div data-cy="area-instruments" className={`${!show && "hidden"}`}>
      <h2 className={"area-header"}>Instruments</h2>
      <InstrumentSearch onInstrumentSelected={(instrument) => onInstrumentSelected(instrument)} />
      <InstrumentsEdit items={instrumentItems} />
      <MainButton text="To Review" onClick={() => {}} />
    </div>
  )
}

export default InstrumentsArea
