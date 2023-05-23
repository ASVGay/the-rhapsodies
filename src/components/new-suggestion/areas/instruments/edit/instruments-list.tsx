import { NewSuggestionInstrument } from "@/interfaces/new-suggestion"
import InstrumentsListItem from "./instruments-list-item"
import { AppDispatch, AppState } from "@/redux/store"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { updateNewSuggestion } from "@/redux/slices/new-suggestion.slice"

const InstrumentsList = () => {
  const dispatch: AppDispatch = useDispatch()
  const newSuggestion = useSelector((state: AppState) => state.newSuggestion.suggestion)
  const [instrumentListItems, setInstrumentListItems] = useState<NewSuggestionInstrument[]>(
    newSuggestion.instruments
  )

  useEffect(() => {
    setInstrumentListItems(newSuggestion.instruments)
  }, [instrumentListItems, newSuggestion])

  const onDeleteInstrument = (index: number) => {
    const newItems = [...instrumentListItems]
    newItems.splice(index, 1)

    dispatch(
      updateNewSuggestion({
        ...newSuggestion,
        instruments: newItems,
      })
    )
  }

  const onDescriptionChanged = (index: number, description: string) => {
    const newItems = [...instrumentListItems]
    newItems[index] = { ...newItems[index], description }

    dispatch(
      updateNewSuggestion({
        ...newSuggestion,
        instruments: newItems,
      })
    )
  }

  return (
    <ul data-cy="instrument-edit-list">
      {instrumentListItems.map((instrumentItem: NewSuggestionInstrument, index) => {
        return (
          <InstrumentsListItem
            onDeleteClick={() => onDeleteInstrument(index)}
            instrumentItem={instrumentItem}
            onDescriptionChanged={(description) => onDescriptionChanged(index, description)}
            key={index}
          />
        )
      })}
    </ul>
  )
}

export default InstrumentsList
