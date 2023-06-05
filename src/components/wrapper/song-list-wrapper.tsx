import {ChangeEvent, useEffect, useRef, useState} from "react"
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
import {getSuggestions} from "@/services/suggestion.service";

interface SongListPageWrapperProps {
  renderSuggestionCard: (suggestion: Suggestion) => JSX.Element
  pageName: string
}
const SongListPageWrapper = (props: SongListPageWrapperProps) => {
  const router = useRouter()
  const supabaseClient = useSupabaseClient<Database>()
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSpinner, setShowSpinner] = useState(true);
  const [showLoadingError, setShowLoadingError] = useState(false);
  const [noSuggestionsText, setNoSuggestionsText] = useState("");
  const [searchedSuggestions, setSearchedSuggestions] = useState<Suggestion[]>([]);
  const [noSearchResultText, setNoSearchResultText] = useState('');

  useEffect(() => {
    setShowSpinner(true);
    getSuggestions(supabaseClient)
        .then((response) => {
          if (response.error) {
            setShowLoadingError(true);
            return;
          }

          if (response.data?.length > 0) {
            setSuggestions(response.data as Suggestion[]);
            setNoSuggestionsText("");
          } else {
            setNoSuggestionsText(
                "Looks like there are no suggestions made yet! Feel free to start adding them."
            );
          }
        })
        .catch(() => {
          setShowLoadingError(true);
        })
        .finally(() => {
          setShowSpinner(false);
        });
  }, [supabaseClient]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.toLowerCase();
    const filteredSuggestions = suggestions.filter(({ title, motivation, artist }) => {
      return (
          title.toLowerCase().includes(input) ||
          motivation.toLowerCase().includes(input) ||
          artist.some((artist) => artist.toLowerCase().includes(input))
      );
    });

    if (filteredSuggestions.length === 0) {
      setNoSearchResultText(
          "It looks like the song you are looking for has not been suggested yet. Feel free to suggest the song!"
      );
    } else {
      setNoSearchResultText('');
    }

    setSearchedSuggestions(filteredSuggestions);
  };


  useEffect(() => {
    if (showSearchBar && inputRef.current) {
      inputRef.current.focus()
    }
  }, [showSearchBar])

  const renderSuggestions = () => {
    const displayedSuggestions = showSearchBar ? searchedSuggestions : suggestions
    return (
      <div className={"flex flex-wrap justify-center gap-6"} data-cy="suggestions-list">
        {displayedSuggestions.map((suggestion: Suggestion) =>
          props.renderSuggestionCard(suggestion)
        )}
      </div>
    )
  }

  return (
    <div className={"page-wrapper"}>
      <div className={"flex justify-between"} style={{ display: showSearchBar ? "none" : "flex" }}>
        <div className={"page-header"}>{props.pageName}</div>
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

      {noSuggestionsText.length !== 0 ||
        (noSearchResultText.length !== 0 && (
          <div
            className={"max-w-m flex items-center justify-center gap-4 text-zinc-400"}
            data-cy="no-suggestions-text"
          >
            <div>
              <MagnifyingGlassCircleIcon className={"h-[50px] w-[50px]"} />
            </div>
            <p>{noSuggestionsText.length !== 0 ? noSuggestionsText : noSearchResultText}</p>
          </div>
        ))}
    </div>
  )
}

export default SongListPageWrapper
