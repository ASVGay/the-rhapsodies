import React from "react"
import { DocumentTextIcon, LinkIcon, UserIcon } from "@heroicons/react/24/outline"
import { useFormContext } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, AppState } from "@/redux/store"
import { setActiveArea, updateNewSuggestion } from "@/redux/slices/new-suggestion.slice"
import { Area } from "@/constants/area"
import ErrorMessage from "@/components/error/error-message"
import { InputsSongInformation } from "@/interfaces/new-suggestion"
import {
  isSongInformationInvalid,
  submitSongInformationForm,
} from "@/helpers/new-suggestion.helper"

const SongInformationArea = () => {
  const newSuggestion = useSelector((state: AppState) => state.newSuggestion.suggestion)
  const dispatch: AppDispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useFormContext<InputsSongInformation>()

  const onSubmit = ({ title, artist, link, motivation }: InputsSongInformation) => {
    dispatch(
      updateNewSuggestion({
        ...newSuggestion,
        title,
        artist: [artist],
        link,
        motivation,
      })
    )
  }

  function submitAndGoToInstruments() {
    submitSongInformationForm()
    if (!isSongInformationInvalid(watch)) dispatch(setActiveArea(Area.Instruments))
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
          <div className="input">
            <input
              data-cy={"input-title"}
              type="text"
              placeholder="Title"
              className={`${errors.title && "error"}`}
              {...register("title", {
                validate: (value) => {
                  return !!value.trim()
                },
              })}
            />
            <span>
              <DocumentTextIcon />
            </span>
          </div>
        </div>

        <div className={"input-container"}>
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
                validate: (value: string) => {
                  return !!value.trim()
                },
              })}
            />
            <span>
              <UserIcon />
            </span>
          </div>
        </div>

        <div className={"input-container"}>
          <label htmlFor="link" className="sr-only">
            Link to the song (optional)
          </label>

          <div className="input">
            <input
              data-cy={"input-link"}
              type="url"
              placeholder="Link to the song (optional)"
              {...register("link")}
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
                validate: (value) => {
                  return !!value.trim()
                },
              })}
            />
          </div>
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
