import { UseFormWatch } from "react-hook-form"
import { InputsSongInformation, NewSuggestionInstrument } from "@/interfaces/new-suggestion"

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

export function isInstrumentSuggestionInvalid(instruments: NewSuggestionInstrument[]) {
  return instruments.length < 1
}