import { FC, useEffect, useState } from "react"
import { getSuggestions } from "@/services/suggestion.service"
import SuggestionCard from "@/components/suggestion/suggestion-card"
import { PlusIcon } from "@heroicons/react/24/solid"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { Database } from "@/types/database"
import { Suggestion } from "@/types/database-types"
import { useRouter } from "next/router"
import ErrorPopup from "@/components/utils/error-popup"
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/outline"
import Spinner from "@/components/utils/spinner"

const Suggestions: FC = () => {
  const router = useRouter()
  const supabaseClient = useSupabaseClient<Database>()
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [showSpinner, setShowSpinner] = useState<boolean>(true)
  const [showLoadingError, setShowLoadingError] = useState<boolean>(false)
  const [noSuggestionsMade, setNoSuggestionsMade] = useState<boolean>(false)

  useEffect(() => {
    getSuggestions(supabaseClient)
      .then((response) => {
        response.data
          ? setSuggestions(response.data as Suggestion[])
          : setShowLoadingError(true)
      })
      .catch(() => setShowLoadingError(true))
      .finally(() => {
        setShowSpinner(false)
      })
  }, [supabaseClient])

  useEffect(() => {
    setNoSuggestionsMade(suggestions.length === 0)
  }, [suggestions])

  return (
    <div className={"page-wrapper"}>
      <div className={"flex justify-between pb-6"}>
        <div className={"text-2xl font-semibold leading-8"}>Suggestions</div>
        <div>
          <PlusIcon className={"h-8 w-8 text-black"} onClick={() => {
          }} />
        </div>
      </div>

      {showSpinner
        ? <div className={"text-center"} data-cy="suggestions-spinner"><Spinner size={10} /></div>
        : <div className={"flex flex-wrap justify-center gap-6"} data-cy="suggestions-list">
          {suggestions.map((suggestion) => (
            <SuggestionCard key={suggestion.id} suggestion={suggestion} />
          ))}
        </div>}

      {showLoadingError && <div className={"mt-6"}>
        <ErrorPopup text={"Failed to load suggestions."} closePopup={() => setShowLoadingError(false)} />
      </div>}

      {noSuggestionsMade && <div className={"flex max-w-m gap-4 text-zinc-400 items-center justify-center"}>
        <div><MagnifyingGlassCircleIcon className={"w-[50px] h-[50px]"} /></div>
        <p>Looks like there are no suggestions made yet! Feel free to start adding them.</p>
      </div>}
    </div>
  )
}

export default Suggestions
