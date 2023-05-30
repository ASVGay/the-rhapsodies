import React, { useState } from "react"
import SuggestionPageSection from "@/components/new-suggestion/suggestion-page-section"
import { GetServerSideProps } from "next"
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs"
import { getSuggestion } from "@/services/suggestion.service"
import { Instrument, Suggestion } from "@/types/database-types"
import { NewSuggestion, NewSuggestionInstrument } from "@/interfaces/new-suggestion"

export const getServerSideProps: GetServerSideProps = async (context) => {
  const supabase = createPagesServerClient(context)
  const { params } = context
  try {
    let { data } = await getSuggestion(supabase, params?.suggestion as string)
    if (data == null) return { notFound: true }
    return { props: { suggestion: data } }
  } catch {
    return { notFound: true }
  }
}

interface EditSuggestionPageProps {
  suggestion: Suggestion
}

const EditSuggestionPage = (props: EditSuggestionPageProps) => {
  //TODO: add method to retrieve correct suggestion to edit

  const suggestionInstruments: NewSuggestionInstrument[] = []

  props.suggestion.suggestion_instruments.forEach((element) => {
    console.log(element.description)
    suggestionInstruments.push({
      description: element.description || "",
      instrument: element.instrument,
    })
  })
  const [suggestion] = useState<NewSuggestion>({
    artist: props.suggestion.artist,
    link: props.suggestion.link,
    motivation: props.suggestion.motivation,
    title: props.suggestion.title,
    instruments: suggestionInstruments,
  })

  return <SuggestionPageSection title={"Edit Suggestion"} suggestion={suggestion} />
}

export default EditSuggestionPage
