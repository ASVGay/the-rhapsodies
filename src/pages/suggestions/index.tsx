import {FC, FormEvent, useEffect, useRef, useState} from "react"
import { getSuggestions } from "@/services/suggestion.service"
import SuggestionCard from "@/components/suggestion/suggestion-card"
import { PlusIcon } from "@heroicons/react/24/solid"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { Database } from "@/types/database"
import { Suggestion } from "@/types/database-types"
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/outline"
import Spinner from "@/components/utils/spinner"
import ErrorPopup from "@/components/popups/error-popup"
import { useRouter } from "next/router"
import {MagnifyingGlassIcon} from "@heroicons/react/20/solid";

const Suggestions: FC = () => {
  const router = useRouter()
  const supabaseClient = useSupabaseClient<Database>()
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [searchedSuggestions, setSearchedSuggestions] = useState<Suggestion[]>([])
  const [showSpinner, setShowSpinner] = useState<boolean>(false)
  const [showLoadingError, setShowLoadingError] = useState<boolean>(false)
  const [noSuggestionsMade, setNoSuggestionsMade] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    setShowSpinner(true)
    getSuggestions(supabaseClient)
      .then((response) => {
        if (response.error) {
          setShowLoadingError(true)
          return
        }

        response.data?.length! > 0
          ? setSuggestions(response.data as Suggestion[])
          : setNoSuggestionsMade(true)
      })
      .catch(() => {
        setShowLoadingError(true)
      })
      .finally(() => {
        setShowSpinner(false)
      })
  }, [supabaseClient])

  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    if(inputRef.current) {
      const searchText: string = inputRef.current.value;
      console.log(searchText)
      inputRef.current.value = ""
    }
  }

  return (
    <div className={"page-wrapper"}>
      <div className={"flex justify-between"}>
        <div className={"page-header"}>Suggestions</div>
        <PlusIcon
          data-cy={"button-new-suggestion"}
          className={"h-8 w-8 cursor-pointer text-black hover:text-zinc-400"}
          onClick={() => router.push("/suggestions/new")}
        />
      </div>

      <form className="h-12 relative" onSubmit={(e) => handleSearch(e)}>
        <input
            ref={inputRef}
            type="text"
            placeholder="Enter a song..."
            data-cy="search-suggestion-input"
            className="flex w-full rounded-lg px-4 py-2 pr-10 outline outline-2 outline-gray-300 hover:outline-moon-300 focus:outline-moon-300"
        />
        <MagnifyingGlassIcon
            className="absolute right-0 top-0 mr-3 mt-3 h-5 w-5 text-gray-500 cursor-pointer"
            onClick={(e) => handleSearch(e)}
        />
      </form>

      {showSpinner && (
        <div className={"h-[75vh] text-center"} data-cy="suggestions-spinner">
          <Spinner size={10} />
        </div>
      )}

      {suggestions && (
        <div className={"flex flex-wrap justify-center gap-6"} data-cy="suggestions-list">
          {suggestions.map((suggestion) => (
            <SuggestionCard key={suggestion.id} suggestion={suggestion} />
          ))}
        </div>
      )}

      {showLoadingError && (
        <div className={"mt-6"} data-cy="failed-fetching-suggestions">
          <ErrorPopup
            text={"Failed to load suggestions."}
            closePopup={() => setShowLoadingError(false)}
          />
        </div>
      )}

      {noSuggestionsMade && (
        <div
          className={"max-w-m flex items-center justify-center gap-4 text-zinc-400"}
          data-cy="no-suggestions-made"
        >
          <div>
            <MagnifyingGlassCircleIcon className={"h-[50px] w-[50px]"} />
          </div>
          <p>Looks like there are no suggestions made yet! Feel free to start adding them.</p>
        </div>
      )}
    </div>
  )
}

export default Suggestions
