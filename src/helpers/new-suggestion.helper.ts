import { UseFormWatch } from "react-hook-form"
import { InputsSongInformation, ISuggestion, ISuggestionInstrument } from "@/interfaces/suggestion"
import { SongInstrumentDatabaseOperation } from "@/types/database-types"

export function submitSongInformationForm() {
  document
    .querySelector("#song-information")
    // Those properties are necessary [src: https://stackoverflow.com/a/65667238]
    ?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }))
}

export function isSongInformationInvalid<TFieldNames, TFieldName>(
  watch: UseFormWatch<InputsSongInformation>
) {
  return watch("title") == "" || watch("artist").length == 0 || watch("motivation") == ""
}

export function isInstrumentSuggestionInvalid(instruments: ISuggestionInstrument[]) {
  return instruments.length < 1
}

export const mapInstruments = (
  suggestion: ISuggestion,
  suggestionId: string
): SongInstrumentDatabaseOperation[] => {
  return suggestion.instruments.map(({ id, instrument, description }) => ({
    id: id,
    song_id: suggestionId,
    instrument_id: instrument.id,
    description: description,
  }))
}

export const mapEditInstruments = (
  suggestion: ISuggestion,
  suggestionId: string
): SongInstrumentDatabaseOperation[] => {
  return suggestion.instruments.map(({ instrument, description }) => ({
    song_id: suggestionId,
    instrument_id: instrument.id,
    description: description,
  }))
}
