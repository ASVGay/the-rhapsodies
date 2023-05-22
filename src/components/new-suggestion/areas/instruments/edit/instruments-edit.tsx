import { NewSuggestionInstrument } from "@/interfaces/new-suggestion"
import InstrumentsEditItem from "./instruments-edit-item"

interface InstrumentEditProps {
  items: NewSuggestionInstrument[]
  onDeleteClick(item: NewSuggestionInstrument): boolean
}

const InstrumentsEdit = ({ items, onDeleteClick }: InstrumentEditProps) => {
  return (
    <div>
      {items.map((instrumentItem: NewSuggestionInstrument, index) => {
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
