import { UseFormWatch } from "react-hook-form"
import { InputsSongInformation, ISuggestion, ISuggestionInstrument } from "@/interfaces/suggestion"
import { SongInstrumentDatabaseOperation } from "@/types/database-types"

export const submitSongInformationForm = () => {
  document
    .querySelector("#song-information")
    // Those properties are necessary [src: https://stackoverflow.com/a/65667238]
    ?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }))
}

export const isSongInformationInvalid = <TFieldNames, TFieldName>(
  watch: UseFormWatch<InputsSongInformation>,
) => {
  return watch("title") == "" || watch("artist").length == 0 || watch("motivation") == ""
}

export const isInstrumentSuggestionInvalid = (instruments: ISuggestionInstrument[]) => {
  return instruments.length < 1
}

export const mapInstruments = (
  instruments: ISuggestionInstrument[],
  suggestionId: string,
): SongInstrumentDatabaseOperation[] => {
  return instruments.map(({ instrument, description }) => ({
    song_id: suggestionId,
    instrument_id: instrument.id,
    description: description,
  }))
}

export const mapEditInstruments = (
  instruments: ISuggestionInstrument[],
  suggestionId: string,
): SongInstrumentDatabaseOperation[] => {
  return instruments.map(({ id, instrument, description }) => ({
    id: id,
    song_id: suggestionId,
    instrument_id: instrument.id,
    description: description,
  }))
}

export const getSongInformationFormData = (suggestion: ISuggestion) => {
  return {
    defaultValues: {
      ...suggestion,
      artist: suggestion.artist.join(","),
    } as InputsSongInformation,
    shouldFocusError: false,
  }
}
