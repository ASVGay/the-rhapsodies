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

const Suggestions: FC = () => {
  const router = useRouter()
  const supabaseClient = useSupabaseClient<Database>()
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [searchedSuggestions, setSearchedSuggestions] = useState<Suggestion[]>([])
  const [showSpinner, setShowSpinner] = useState<boolean>(false)
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false)
  const [showLoadingError, setShowLoadingError] = useState<boolean>(false)
  const [noSuggestionsText, setNoSuggestionsText] = useState<string>("")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setShowSpinner(true)
    getSuggestions(supabaseClient)
      .then((response) => {
        if (response.error) {
          setShowLoadingError(true)
          return
        }

        response.data?.length! > 0
          ? (setSuggestions(response.data as Suggestion[]), setNoSuggestionsText(""))
          : setNoSuggestionsText(
              "Looks like there are no suggestions made yet! Feel free to start adding them."
            )
      })
      .catch(() => {
        setShowLoadingError(true)
      })
      .finally(() => {
        setShowSpinner(false)
      })
  }, [supabaseClient])

  useEffect(() => {
    if (showSearchBar && inputRef.current) {
      inputRef.current.focus()
    }
  }, [showSearchBar])

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchText: string = e.target.value

    const filteredSuggestions = suggestions.filter((suggestion) => {
      const { title, motivation, artist } = suggestion
      const lowerCaseSearchText = searchText.toLowerCase()
      return (
        title.toLowerCase().includes(lowerCaseSearchText) ||
        motivation.toLowerCase().includes(lowerCaseSearchText) ||
        artist.some((artist) => artist.toLowerCase().includes(lowerCaseSearchText))
      )
    })

    if (filteredSuggestions.length === 0) {
      setNoSuggestionsText(
        "Looks like the song you are looking for does not exist yet! Feel free to add the song!"
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
