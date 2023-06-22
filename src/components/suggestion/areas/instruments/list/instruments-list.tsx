import { ISuggestionInstrument } from "@/interfaces/suggestion"
import InstrumentsListItem from "./instruments-list-item"

interface InstrumentsListProps {
  newInstruments: ISuggestionInstrument[]
  onNewInstrumentsChanged(newInstrumentsList: ISuggestionInstrument[]): void
}

const InstrumentsList = ({ newInstruments, onNewInstrumentsChanged }: InstrumentsListProps) => {
  const onDeleteInstrument = (index: number) => {
    const newItems: ISuggestionInstrument[] = [...newInstruments]
    newItems.splice(index, 1)

    onNewInstrumentsChanged(newItems)
  }

  const onDescriptionChanged = (index: number, description: string) => {
    const newItems = [...newInstruments]
    newItems[index] = { ...newItems[index], description }
    onNewInstrumentsChanged(newItems)
  }

  return (
    <ul data-cy="instrument-edit-list">
      {newInstruments.map((instrumentItem: ISuggestionInstrument, index) => {
        const key = `${instrumentItem.instrument.id}-${index}`
        return (
          <InstrumentsListItem
            onDeleteClick={() => onDeleteInstrument(index)}
            instrumentItem={instrumentItem}
            onDescriptionChanged={(description) => onDescriptionChanged(index, description)}
            key={key}
          />
        )
      })}
    </ul>
  )
}

export default InstrumentsList
