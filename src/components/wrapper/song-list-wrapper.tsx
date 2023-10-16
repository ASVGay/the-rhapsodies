import { ChangeEvent, useEffect, useRef, useState } from "react"
import { PlusIcon } from "@heroicons/react/24/solid"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { Database } from "@/types/database"
import { Song } from "@/types/database-types"
import { MagnifyingGlassCircleIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import Spinner from "@/components/utils/spinner"
import ErrorPopup from "@/components/popups/error-popup"
import { useRouter } from "next/router"
import SearchBar from "@/components/suggestion/search-bar"
import { getRepertoireSongs, getSuggestions } from "@/services/suggestion.service"
import SuggestionCard from "@/components/suggestion/suggestion-card"
import RepertoireCard from "@/components/repertoire/repertoire-card"

interface SongListWrapperProps {
  songType: SongType
}

export enum SongType {
  Repertoire,
  Suggestion,
}

const SongListWrapper = ({ songType }: SongListWrapperProps) => {
  const router = useRouter()
  const supabaseClient = useSupabaseClient<Database>()
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const [songs, setSongs] = useState<Song[]>([])
  const [showSpinner, setShowSpinner] = useState(true)
  const [showLoadingError, setShowLoadingError] = useState(false)
  const [searchedSong, setSearchedSong] = useState<Song[]>([])
  const [errorText, setErrorText] = useState("")

  useEffect(() => {
    setShowSpinner(true)
    const songs =
      songType == SongType.Suggestion
        ? getSuggestions(supabaseClient)
        : getRepertoireSongs(supabaseClient)

    songs
      .then((response) => {
        if (response.error) {
          setShowLoadingError(true)
          return
        }

        if (response.data?.length > 0) {
          setSongs(response.data as Song[])
        } else {
          songType === SongType.Suggestion
            ? setErrorText(
                "Looks like there are no suggestions made yet! Feel free to start adding them.",
              )
            : setErrorText("Looks like there are no songs in the repertoire yet.")
        }
      })
      .catch(() => {
        setShowLoadingError(true)
      })
      .finally(() => {
        setShowSpinner(false)
      })
  }, [songType, supabaseClient])

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.toLowerCase()
    const filteredSongs = songs.filter(({ title, motivation, artist }) => {
      return (
        title.toLowerCase().includes(input) ||
        motivation.toLowerCase().includes(input) ||
        artist.some((artist: string) => artist.toLowerCase().includes(input))
      )
    })

    if (filteredSongs.length === 0) {
      songType === SongType.Suggestion
        ? setErrorText(
            `It looks like the song you are looking for has not been added yet. Feel free to add the song!`,
          )
        : setErrorText("This song is currently not in the repertoire.")
    } else {
      setErrorText("")
    }

    setSearchedSong(filteredSongs)
  }

  useEffect(() => {
    if (showSearchBar && inputRef.current) {
      inputRef.current.focus()
    }
  }, [showSearchBar])

  const renderSongs = () => {
    const searchedSongs = showSearchBar ? searchedSong : songs
    return (
      <div className={"flex flex-wrap justify-center gap-6"} data-cy="suggestions-list">
        {searchedSongs.map((song: Song) =>
          songType == SongType.Suggestion ? (
            <SuggestionCard
              key={song.id}
              song={song}
              setShowSpinner={setShowSpinner}
              router={router}
            />
          ) : (
            <RepertoireCard
              key={song.id}
              song={song}
              setShowSpinner={setShowSpinner}
              router={router}
            />
          ),
        )}
      </div>
    )
  }

  return (
    <div className={"page-wrapper"}>
      <div className={"flex justify-between"} style={{ display: showSearchBar ? "none" : "flex" }}>
        <div className={"page-header"}>
          {songType === SongType.Suggestion ? "Suggestion" : "Repertoire"}
        </div>
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
        <div className={"h-[75vh] text-center"} data-cy="song-list-spinner">
          <Spinner size={10} />
        </div>
      )}

      {!showSpinner && renderSongs()}

      {showLoadingError && (
        <div className={"mt-6"} data-cy="failed-fetching-suggestions">
          <ErrorPopup
            text={"Failed to load songs."}
            closePopup={() => setShowLoadingError(false)}
          />
        </div>
      )}

      {errorText.length !== 0 && (
        <div
          className={"max-w-m flex items-center justify-center gap-4 text-zinc-400"}
          data-cy="no-suggestions-text"
        >
          <div>
            <MagnifyingGlassCircleIcon className={"h-[50px] w-[50px]"} />
          </div>
          <p>{errorText}</p>
        </div>
      )}
    </div>
  )
}

export default SongListWrapper
