import React from "react"

interface InstrumentsAreaProps {
  show: boolean
}

const InstrumentsArea = ({ show }: InstrumentsAreaProps) => {
  return (
    <div className={`${!show && "hidden"}`}>
      <h2 className={"area-header"}>Instruments</h2>
    </div>
  )
}

export default InstrumentsArea
