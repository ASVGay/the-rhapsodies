import MainButton from "@/components/buttons/main-button"
import InstrumentSearch from "@/components/search/instrument/instrument-search"
import { Instrument } from "@/constants/instruments"
import React from "react"

interface InstrumentsAreaProps {
  show: boolean
}

const InstrumentsArea = ({ show }: InstrumentsAreaProps) => {
  const onInstrumentSelected = (instrument: Instrument): boolean => {
    console.log("Selected: " + instrument.instrumentName)
    return true
  }

  return (
    <div data-cy="area-instruments" className={`${!show && "hidden"}`}>
      <h2 className={"area-header"}>Instruments</h2>
      <InstrumentSearch />
      <MainButton text="To Review" onClick={() => {}} />
    </div>
  )
}

export default InstrumentsArea
