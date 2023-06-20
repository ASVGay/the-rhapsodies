import React, { useEffect, useState } from "react"
import { DocumentTextIcon, LinkIcon, UserIcon } from "@heroicons/react/24/outline"
import { useFormContext } from "react-hook-form"
import { useSelector } from "react-redux"
import { AppState } from "@/redux/store"
import ErrorMessage from "@/components/error/error-message"
import {
  isSongInformationInvalid,
  submitSongInformationForm,
} from "@/helpers/new-suggestion.helper"
import Spinner from "@/components/utils/spinner"
import { SearchItem, SpotifySearchItem } from "@/interfaces/spotify-search-item"
import { useRouter } from "next/router"
import {
  getSpotifySearchResults,
  requestSpotifyAccessToken,
  setSpotifyAccessToken,
} from "@/services/spotify.service"
import ErrorPopup from "@/components/popups/error-popup"
import { debounce } from "debounce"
import { InputsSongInformation } from "@/interfaces/suggestion"

interface SongInformationAreaProps {
  onFormSuccess(songInformation: InputsSongInformation): void

  proceedToNextArea(): void
}

const SongInformationArea = ({ proceedToNextArea, onFormSuccess }: SongInformationAreaProps) => {
  const { basePath } = useRouter()

  const newSuggestion = useSelector((state: AppState) => state.newSuggestion.suggestion)
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
  } = useFormContext<InputsSongInformation>()

  const [manualInput, setManualInput] = useState<boolean>(false)
  const [searchResults, setSearchResults] = useState<SearchItem[]>([])
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [fetchingSongs, setFetchingSongs] = useState(false)
  const [showSearchError, setShowSearchError] = useState<boolean>(false)

  useEffect(() => {
    setManualInput(newSuggestion.title.length !== 0)

    requestSpotifyAccessToken(basePath).then(async (response) => {
      setSpotifyAccessToken(await response.json())
    })
  }, [])

  const onSubmit = (songInformation: InputsSongInformation) => {
    onFormSuccess(songInformation)
  }

  const submitAndGoToInstruments = () => {
    submitSongInformationForm()
    if (!isSongInformationInvalid(watch)) proceedToNextArea()
  }

  const debouncedHandleSearch = debounce((value: string) => {
    if (value.length == 0) return

    setFetchingSongs(true)
    getSpotifySearchResults(basePath, getValues().title)
      .then(async (response) => {
        const data: SpotifySearchItem[] = (await response.json()).tracks.items
        const items: SearchItem[] = data.map((item) => ({
          id: item.id,
          title: item.name,
          artists: item.artists.map((artist): string => artist.name),
          link: item.external_urls.spotify,
          image: item.album.images.pop()?.url ?? null,
          previewUrl: item.preview_url,
        }))
        setSearchResults(items)
      })
      .catch(() => setShowSearchError(true))
      .finally(() => setFetchingSongs(false))
  }, 400)

  const handleSearch = (value: string) => {
    setValue("title", value)
    debouncedHandleSearch(value)
  }

  const handleSearchBlur = () => {
    setTimeout(() => {
      setIsSearchFocused(false)
    }, 100)
  }

  const onSelectSearchResult = (item: SearchItem) => {
    setValue("title", item.title)
    setValue("artist", item.artists.join(", "))
    setValue("link", item.link)
    setValue("image", item.image)
    setValue("previewUrl", item.previewUrl)
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

          {manualInput ? (
            <div className="input">
              <input
                data-cy={"input-title"}
                type="text"
                placeholder="Title"
                className={`${errors.title && "error"}`}
                {...register("title", {
                  validate: (value) => !!value.trim(),
                })}
              />
              <span>
                <DocumentTextIcon />
              </span>
            </div>
          ) : (
            <div className="input">
              <input
                data-cy={"input-title"}
                type="text"
                placeholder="Search for a song title"
                className={`${errors.title && "error"}`}
                {...register("title", {
                  validate: (value) => !!value.trim(),
                  onChange: (event) => handleSearch(event.target.value),
                })}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={handleSearchBlur}
              />
              <span>{fetchingSongs ? <Spinner size={2} /> : <DocumentTextIcon />}</span>
              {isSearchFocused && getValues().title.length !== 0 && searchResults.length > 0 && (
                <div className="absolute z-10 w-full rounded-md bg-white shadow-md outline outline-1 outline-gray-300">
                  <ul data-cy="song-information-dropdown">
                    {searchResults.map((item: SearchItem) => {
                      return (
                        <div
                          key={item.id}
                          onClick={() => onSelectSearchResult(item)}
                          className={
                            "cursor-pointer items-center p-4 hover:bg-moon-300 hover:text-white"
                          }
                        >
                          <b>{item.title}</b>
                          <p>{item.artists.join(", ")}</p>
                        </div>
                      )
                    })}
                  </ul>
                </div>
              )}
            </div>
          )}
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
                validate: (value: string) => !!value.trim(),
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
                onChange: (event) => setValue("link", event.target.value),
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
                validate: (value) => !!value.trim(),
              })}
            />
          </div>
        </div>

        <div className={"input-container"} hidden={true}>
          <div className="input">
            <input type="url" {...register("image")} />
          </div>
        </div>

        <div className={"input-container"} hidden={true}>
          <div className="input">
            <input type="url" {...register("previewUrl")} />
          </div>
        </div>

        <div>
          <button
            className={"mb-6 text-moon-400"}
            onClick={() => setManualInput(!manualInput)}
            type={"button"}
            data-cy="manual-input-btn"
          >
            {manualInput ? "Or autofill song information" : "Or enter song information manually"}
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

      {showSearchError && (
        <div className={"mt-6"} data-cy="search-error">
          <ErrorPopup
            text={"Failed to fetch song search results."}
            closePopup={() => setShowSearchError(false)}
          />
        </div>
      )}
    </div>
  )
}

export default SongInformationArea
