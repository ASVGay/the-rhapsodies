import { UseFormWatch } from "react-hook-form"
import {
  InputsSongInformation,
  NewSuggestion,
  NewSuggestionInstrument,
} from "@/interfaces/new-suggestion"
import { SuggestionInstrumentDatabaseOperation } from "@/types/database-types"

export const submitSongInformationForm = () => {
  document
    .querySelector("#song-information")
    // Those properties are necessary [src: https://stackoverflow.com/a/65667238]
    ?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }))
}

export const isSongInformationInvalid = <TFieldNames, TFieldName>(
  watch: UseFormWatch<InputsSongInformation>
) => {
  return watch("title") == "" || watch("artist").length == 0 || watch("motivation") == ""
}

export const isInstrumentSuggestionInvalid = (instruments: NewSuggestionInstrument[]) => {
  return instruments.length < 1
}

export const mapInstruments = (
  suggestion: NewSuggestion,
  suggestionId: string
): SuggestionInstrumentDatabaseOperation[] => {
  return suggestion.instruments.map(({ instrument, description }) => {
    return { suggestion_id: suggestionId, instrument_id: instrument.id, description: description }
  })
}
