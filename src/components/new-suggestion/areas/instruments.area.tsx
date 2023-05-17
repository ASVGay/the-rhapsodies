import InstrumentDropdown from "@/components/dropdown/instrument-dropdown"
import React from "react"

interface InstrumentsAreaProps {
  show: boolean
}

const InstrumentsArea = ({ show }: InstrumentsAreaProps) => {
  return (
    <div data-cy="area-instruments" className={`${!show && "hidden"}`}>
      <h2 className={"area-header"}>Instruments</h2>
      <InstrumentDropdown />
    </div>
  )
}

export default InstrumentsArea
