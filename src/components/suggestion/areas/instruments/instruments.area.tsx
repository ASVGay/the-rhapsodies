import React from "react"
import InstrumentsList from "./list/instruments-list"
import InstrumentSearch from "@/components/suggestion/areas/instruments/search/instrument-search"
import { Instrument } from "@/types/database-types"
import { ISuggestionInstrument } from "@/interfaces/suggestion"

interface InstrumentsAreaProps {
  instrumentList: Instrument[]
  newSuggestionInstruments: ISuggestionInstrument[]
  onInstrumentsChanged(newInstruments: ISuggestionInstrument[]): void
  onSubmit(): void
}

const InstrumentsArea = ({
  instrumentList,
  newSuggestionInstruments,
  onSubmit,
  onInstrumentsChanged,
}: InstrumentsAreaProps) => {
  const onInstrumentSelected = (instrument: Instrument) => {
    const newItem: ISuggestionInstrument = {
      instrument: instrument,
      description: "",
    }

    onInstrumentsChanged([...newSuggestionInstruments, newItem])
  }

  return (
    <div data-cy="area-instruments">
      <h2 className={"area-header"}>Instruments</h2>
      <InstrumentSearch
        instruments={instrumentList}
        onInstrumentSelected={(instrument: Instrument) => onInstrumentSelected(instrument)}
      />
      <InstrumentsList
        newInstruments={newSuggestionInstruments}
        onNewInstrumentsChanged={onInstrumentsChanged}
      />
      <button
        data-cy="to-review-button"
        disabled={newSuggestionInstruments.length < 1}
        className="btn"
        onClick={onSubmit}
      >
        To Review
      </button>
    </div>
  )
}

export default InstrumentsArea
