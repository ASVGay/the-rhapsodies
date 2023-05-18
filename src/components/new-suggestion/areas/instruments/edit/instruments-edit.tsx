import { useState } from "react"
import InstrumentsEditItem, { InstrumentItem } from "./instruments-edit-item"

interface InstrumentEditProps {
  items: InstrumentItem[]
}

const InstrumentsEdit = ({ items }: InstrumentEditProps) => {
  return (
    <div>
      {items.map((instrumentItem: InstrumentItem, index) => {
        return <InstrumentsEditItem instrumentItem={instrumentItem} key={index} />
      })}
    </div>
  )
}

export default InstrumentsEdit
