import React from "react"
import { DocumentTextIcon, LinkIcon, UserIcon } from "@heroicons/react/24/outline"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, AppState } from "@/redux/store"
import { setActiveArea, updateNewSuggestion } from "@/redux/slices/new-suggestion.slice"
import { Area } from "@/constants/area"

interface Inputs {
  artist: string
  link: string
  motivation: string
  title: string
}

const SongInformationArea = () => {
  const newSuggestion = useSelector((state: AppState) => state.newSuggestion.suggestion)
  const dispatch: AppDispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: { ...newSuggestion, artist: newSuggestion.artist.join(",") } as Inputs,
  })

  const onSubmit = ({ title, artist, link, motivation }: Inputs) => {
    dispatch(
      updateNewSuggestion({
        ...newSuggestion,
        title,
        artist: [artist],
        link,
        motivation,
      })
    )
    dispatch(setActiveArea(Area.Instruments))
  }
  return (
    <div data-cy="area-song-information">
      <h2 className={"area-header"}>Song information</h2>

      <form className={"mx-auto sm:w-4/5 lg:w-full"} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="title" className="sr-only">
            Title
          </label>

          <div className="input">
            <input
              type="text"
              placeholder="Title"
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

        <div>
          <label htmlFor="artist" className="sr-only">
            Artist(s)
          </label>

          <div className="input">
            <input
              type="text"
              placeholder="Artist"
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

        <div>
          <label htmlFor="link" className="sr-only">
            Link to the song (optional)
          </label>

          <div className="input">
            <input type="url" placeholder="Link to the song (optional)" {...register("link")} />
            <span>
              <LinkIcon />
            </span>
          </div>
        </div>

        <div>
          <label htmlFor="link" className="sr-only">
            Explain why you would like to play this song with The Rhapsodies.
          </label>

          <div>
            <textarea
              className="mb-6 w-full rounded-lg border border-gray-200 p-3 shadow-sm"
              rows={4}
              placeholder="Explain why you would like to play this song with The Rhapsodies."
              {...register("motivation", {
                validate: (value) => {
                  return !!value.trim()
                },
              })}
            />
          </div>
        </div>

        <button type="submit" className="btn">
          Add instruments
        </button>
      </form>
    </div>
  )
}

export default SongInformationArea
