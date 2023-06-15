import React, { useEffect, useRef, useState } from "react"
import { DocumentTextIcon, LinkIcon, UserIcon } from "@heroicons/react/24/outline"
import { useFormContext } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, AppState } from "@/redux/store"
import { setActiveArea, updateNewSuggestion } from "@/redux/slices/new-suggestion.slice"
import { Area } from "@/constants/area"
import ErrorMessage from "@/components/error/error-message"
import { InputsSongInformation } from "@/interfaces/new-suggestion"
import { isSongInformationInvalid, submitSongInformationForm } from "@/helpers/new-suggestion.helper"
import Spinner from "@/components/utils/spinner"
import { SpotifySearchItem } from "@/interfaces/spotify-search-item"

const SongInformationArea = () => {
  const newSuggestion = useSelector((state: AppState) => state.newSuggestion.suggestion)
  const dispatch: AppDispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues
  } = useFormContext<InputsSongInformation>()

  const [manualInput, setManualInput] = useState<boolean>(false)
  const [searchResults, setSearchResults] = useState<SpotifySearchItem[]>([
    //TODO remove placeholder data
    { id: "1", title: "Example", artists: ["Jorja Smith", "Frank Ocean"], link: "example.com" },
    { id: "2", title: "Example", artists: ["Jorja Smith"], link: "example.song.com" }]
  )
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const listRef = useRef<HTMLUListElement>(null)
  const [fetchingSongs, setFetchingSongs] = useState(false)

  useEffect(() => {
    setManualInput(newSuggestion.title.length !== 0)
  }, [])

  const onSubmit = ({ title, artist, link, motivation }: InputsSongInformation) => {
    dispatch(
      updateNewSuggestion({
        ...newSuggestion,
        title,
        artist: artist.split(", "),
        link,
        motivation
      })
    )
  }

  const submitAndGoToInstruments = () => {
    submitSongInformationForm()
    if (!isSongInformationInvalid(watch)) dispatch(setActiveArea(Area.Instruments))
  }

  const handleSearch = (value: string) => {
    setValue("title", value)

    setFetchingSongs(true)
    //TODO replace timeout with Spotify API call to gather songs search results
    setTimeout(() => {
      setFetchingSongs(false)
    }, 300)
    //TODO setSearchResults as result from Spotify API call
  }

  const handleSearchBlur = () => {
    setTimeout(() => {
      setIsSearchFocused(false)
    }, 100)
  }

  const onSelectSearchResult = (item: SpotifySearchItem) => {
    dispatch(
      updateNewSuggestion({
        ...newSuggestion,
        title: item.title,
        artist: item.artists,
        link: item.link
      })
    )
    setManualInput(true)

    setValue("title", item.title)
    setValue("artist", item.artists.join(", "))
    setValue("link", item.link)

    setSearchResults([])
  }

  return (
    <div data-cy="area-song-information">
      <h2 className={"area-header"}>Song information</h2>

      <form
        id="song-information"
        className={"mx-auto sm:w-4/5 lg:w-full"}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={"input-container"}>
          <label htmlFor="title" className="sr-only">
            Title
          </label>

          {errors.title && (
            <ErrorMessage
              dataCy={"input-title-error"}
              message={"A title is required for a suggestion"}
            />
          )}

          {manualInput
            ? <div className="input">
              <input
                data-cy={"input-title"}
                type="text"
                placeholder="Title"
                className={`${errors.title && "error"}`}
                {...register("title", {
                  validate: (value) => !!value.trim()
                })}
              />
              <span>
              <DocumentTextIcon />
            </span>
            </div>
            : <div className="input">
              <input
                data-cy={"input-title"}
                type="text"
                placeholder="Search for a song title"
                className={`${errors.title && "error"}`}
                {...register("title", {
                  onChange: (event) => handleSearch(event.target.value),
                  validate: (value) => !!value.trim()
                })}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={handleSearchBlur}
              />
              <span>
             {fetchingSongs ? <Spinner size={2} /> : <DocumentTextIcon />}
            </span>
              {isSearchFocused && getValues().title.length !== 0 && searchResults.length > 0 && (
                <div className="absolute z-10 w-full rounded-md bg-white shadow-md outline outline-1 outline-gray-300">
                  <ul ref={listRef}>
                    {searchResults.map((item: SpotifySearchItem) => {
                      return <div
                        key={item.id}
                        onClick={() => onSelectSearchResult(item)}
                        className={"cursor-pointer items-center p-4 hover:bg-moon-300 hover:text-white"}
                      >
                        <b>{item.title}</b>
                        <p>{item.artists.join(", ")}</p>
                      </div>
                    })}
                  </ul>
                </div>
              )}
            </div>
          }
        </div>

        <div className={`input-container`} hidden={!manualInput}>
          {errors.artist && (
            <ErrorMessage
              dataCy={"input-artist-error"}
              message={"One or more artists are required for a suggestion"}
            />
          )}
          <label htmlFor="artist" className="sr-only">
            Artist(s)
          </label>

          <div className="input">
            <input
              data-cy={"input-artist"}
              type="text"
              placeholder="Artist"
              className={`${errors.artist && "error"}`}
              {...register("artist", {
                onChange: (event) => setValue("artist", event.target.value),
                validate: (value: string) => !!value.trim()
              })}

            />
            <span>
              <UserIcon />
            </span>
          </div>
        </div>

        <div className={"input-container"} hidden={!manualInput}>
          <label htmlFor="link" className="sr-only">
            Link to the song (optional)
          </label>

          <div className="input">
            <input
              data-cy={"input-link"}
              type="url"
              placeholder="Link to the song (optional)"
              {...register("link", {
                onChange: (event) => setValue("link", event.target.value)
              })}
            />
            <span>
              <LinkIcon />
            </span>
          </div>
        </div>

        <div className={"input-container"}>
          {errors.motivation && (
            <ErrorMessage
              dataCy={"input-motivation-error"}
              message={"A motivation for this suggestion is required"}
            />
          )}
          <label htmlFor="link" className="sr-only">
            Explain why you would like to play this song with The Rhapsodies
          </label>

          <div className={"mt-1"}>
            <textarea
              data-cy={"input-motivation"}
              className={`w-full rounded-lg p-3 shadow-sm outline outline-2 outline-gray-300 hover:outline-moon-300 focus:outline-moon-300 ${
                errors.motivation && "outline-red-400"
              }`}
              rows={4}
              placeholder="Explain why you would like to play this song with The Rhapsodies"
              {...register("motivation", {
                validate: (value) => !!value.trim()
              })}
            />
          </div>
        </div>

        <div>
          <button
            className={"text-moon-400 mb-6"}
            onClick={() => setManualInput(!manualInput)}
            type={"button"}
          >
            {manualInput
              ? "Or autofill song information"
              : "Or enter song information manually"
            }
          </button>
        </div>

        <button
          data-cy={"button-add-instruments"}
          type="button"
          className="btn song-information mb-4"
          onClick={() => submitAndGoToInstruments()}
        >
          Add instruments
        </button>
      </form>
    </div>
  )
}

export default SongInformationArea
