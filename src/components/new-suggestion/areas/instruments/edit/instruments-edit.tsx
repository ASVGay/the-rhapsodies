import { useState } from "react"
import InstrumentsEditItem, { InstrumentItem } from "./instruments-edit-item"

interface InstrumentEditProps {
  items: InstrumentItem[]
  onDeleteClick(item: InstrumentItem): boolean
}

const InstrumentsEdit = ({ items, onDeleteClick }: InstrumentEditProps) => {
  return (
    <div>
      {items.map((instrumentItem: InstrumentItem, index) => {
        return (
          <InstrumentsEditItem
            onDeleteClick={() => onDeleteClick(instrumentItem)}
            instrumentItem={instrumentItem}
            key={index}
          />
        )
      })}
    </div>
  )
}

export default InstrumentsEdit
