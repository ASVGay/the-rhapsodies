import { ChangeEvent, FC, useEffect, useRef, useState } from "react"
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
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid"
import SearchBar from "@/components/suggestion/search-bar"
import useSuggestions from "@/components/hooks/useSuggestions";

const Suggestions: FC = () => {
  const router = useRouter()
  const supabaseClient = useSupabaseClient<Database>()
  const [searchedSuggestions, setSearchedSuggestions] = useState<Suggestion[]>([])
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const { suggestions, showSpinner, showLoadingError, noSuggestionsText, setNoSuggestionsText, setShowLoadingError } = useSuggestions(supabaseClient);

  useEffect(() => {
    if (showSearchBar && inputRef.current) {
      inputRef.current.focus()
    }
  }, [showSearchBar])

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const input: string = e.target.value.toLowerCase()
    const filteredSuggestions = suggestions.filter(({ title, motivation, artist }) => {
      return (
        title.toLowerCase().includes(input) ||
        motivation.toLowerCase().includes(input) ||
        artist.some((artist) => artist.toLowerCase().includes(input))
      )
    })

    if (filteredSuggestions.length === 0) {
      setNoSuggestionsText(
        "It looks like the song you are looking for has not been suggested yet. Feel free to suggest the song!"
      )
    } else {
      setNoSuggestionsText("")
    }

    setSearchedSuggestions(filteredSuggestions)
  }

  const renderSuggestions = () => {
    const displayedSuggestions = showSearchBar ? searchedSuggestions : suggestions

    return (
      <div className={"flex flex-wrap justify-center gap-6"} data-cy="suggestions-list">
        {displayedSuggestions.map((suggestion) => (
          <SuggestionCard key={suggestion.id} suggestion={suggestion} />
        ))}
      </div>
    )
  }

  return (
    <div className={"page-wrapper"}>
      <div className={"flex justify-between"} style={{ display: showSearchBar ? "none" : "flex" }}>
        <div className={"page-header"}>Suggestions</div>
        <div className={"flex flex-row gap-2"}>
          <MagnifyingGlassIcon
            data-cy={"button-search-suggestions"}
            viewBox={"-1.25 -1.25 23.25 23.25"}
            className="h-8 w-8 cursor-pointer text-black hover:text-zinc-400"
            onClick={() => setShowSearchBar(true)}
          />
          <PlusIcon
            data-cy={"button-new-suggestion"}
            className={"h-8 w-8 cursor-pointer text-black hover:text-zinc-400"}
            onClick={() => router.push("/suggestions/new")}
          />
        </div>
      </div>

      <SearchBar
        handleSearch={handleSearch}
        inputRef={inputRef}
        showSearchBar={showSearchBar}
        setShowSearchBar={setShowSearchBar}
      />

      {showSpinner && (
        <div className={"h-[75vh] text-center"} data-cy="suggestions-spinner">
          <Spinner size={10} />
        </div>
      )}

      {renderSuggestions()}

      {showLoadingError && (
        <div className={"mt-6"} data-cy="failed-fetching-suggestions">
          <ErrorPopup
            text={"Failed to load suggestions."}
            closePopup={() => setShowLoadingError(false)}
          />
        </div>
      )}

      {noSuggestionsText.length !== 0 && (
        <div
          className={"max-w-m flex items-center justify-center gap-4 text-zinc-400"}
          data-cy="no-suggestions-text"
        >
          <div>
            <MagnifyingGlassCircleIcon className={"h-[50px] w-[50px]"} />
          </div>
          <p>{noSuggestionsText}</p>
        </div>
      )}
    </div>
  )
}

export default Suggestions
