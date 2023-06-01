import React, { useState } from "react"
import SuggestionPageSection from "@/components/new-suggestion/suggestion-page-section"
import { GetServerSideProps } from "next"
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs"
import { getSuggestion, updateSuggestion } from "@/services/suggestion.service"
import { Suggestion } from "@/types/database-types"
import { NewSuggestion, NewSuggestionInstrument } from "@/interfaces/new-suggestion"
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { Database } from "@/types/database"
import { useRouter } from "next/router"
import { Area } from "@/constants/area"

export const getServerSideProps: GetServerSideProps = async (context) => {
  const supabase = createPagesServerClient(context)
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession()
  const { params } = context

  try {
    // Check if the suggestion exists
    const { data } = await getSuggestion(supabase, params?.suggestion as string)
    if (data == null) return { notFound: true }

    // If the suggestion has no id
    const author: { id: string } = data?.author as { id: string }
    if (author?.id === undefined) return { notFound: true }

    // If the user does not match with the author of the suggestion
    if (session?.user.id !== author.id)
      return {
        redirect: {
          destination: "/403",
          permanent: false,
        },
      }

    return { props: { suggestion: data } }
  } catch {
    return { notFound: true }
  }
}

interface EditSuggestionPageProps {
  suggestion: Suggestion
}

const EditSuggestionPage = (props: EditSuggestionPageProps) => {
  const user = useUser()
  const supabase = useSupabaseClient<Database>()
  const router = useRouter()

  const suggestionInstruments: NewSuggestionInstrument[] = []
  props.suggestion.suggestion_instruments.forEach((element) => {
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

  const saveSuggestion = (onSuccess: () => void, onError: () => void) => {
    if (user) {
      updateSuggestion(supabase, suggestion, user.id)
        .then((response) => {
          if (response.error) {
            onError()
          }

          router.push("/suggestions").then(() => {
            onSuccess()
          })
        })
        .catch(() => onError())
    } else {
      onError()
    }
  }

  return (
    <SuggestionPageSection
      title={"Edit Suggestion"}
      newSuggestion={suggestion}
      startingArea={Area.Review}
      onReviewSubmit={(success, error) => saveSuggestion(success, error)}
    />
  )
}

export default EditSuggestionPage
