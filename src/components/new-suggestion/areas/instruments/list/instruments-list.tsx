import { NewSuggestionInstrument } from "@/interfaces/new-suggestion"
import InstrumentsListItem from "./instruments-list-item"
import { AppDispatch, AppState } from "@/redux/store"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { updateNewSuggestion } from "@/redux/slices/new-suggestion.slice"

interface InstrumentsListProps {
  newInstruments: NewSuggestionInstrument[]
  onNewInstrumentsChanged(newInstrumentsList: NewSuggestionInstrument[]): void
}

const InstrumentsList = ({ newInstruments, onNewInstrumentsChanged }: InstrumentsListProps) => {
  // useEffect(() => {
  //   setInstrumentListItems(newSuggestion.instruments)
  // }, [instrumentListItems, newSuggestion])

  const onDeleteInstrument = (index: number) => {
    const newItems: NewSuggestionInstrument[] = [...newInstruments]
    newItems.splice(index, 1)

    onNewInstrumentsChanged(newItems)
    // dispatch(
    //   updateNewSuggestion({
    //     ...newSuggestion,
    //     instruments: newItems,
    //   })
    // )
  }

  const onDescriptionChanged = (index: number, description: string) => {
    const newItems = [...newInstruments]
    newItems[index] = { ...newItems[index], description }
    newItems[index].description = description
    onNewInstrumentsChanged(newItems)
    // dispatch(
    //   updateNewSuggestion({
    //     ...newSuggestion,
    //     instruments: newItems,
    //   })
    // )
  }

  return (
    <ul data-cy="instrument-edit-list">
      {newInstruments.map((instrumentItem: NewSuggestionInstrument, index) => {
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
