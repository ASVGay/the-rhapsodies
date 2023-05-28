import React from "react"
import { useSelector } from "react-redux"
import { AppState } from "@/redux/store"
import SuggestionPageSection from "@/components/new-suggestion/suggestion-page-section"

const EditSuggestion = () => {
  //TODO: add method to retrieve correct suggestion to edit
  const suggestion = useSelector((state: AppState) => state.newSuggestion.suggestion)

  return <SuggestionPageSection title={"Edit Suggestion"} suggestion={suggestion} />
}

export default EditSuggestion
