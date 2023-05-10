import React from "react"
import { DocumentTextIcon, LinkIcon, UserIcon } from "@heroicons/react/24/outline"

const SongInformationArea = () => {
  return (
    <div data-cy="area-song-information">
      <h2 className={"area-header"}>Song information</h2>

      <form className={"mx-auto sm:w-4/5 lg:w-full"}>
        <div>
          <label htmlFor="title" className="sr-only">
            Title
          </label>

          <div className="input">
            <input type="text" placeholder="Title" />
            <span>
              <DocumentTextIcon />
            </span>
          </div>
        </div>

        <div>
          <label htmlFor="artist" className="sr-only">
            Artist
          </label>

          <div className="input">
            <input type="text" placeholder="Artist" />
            <span>
              <UserIcon />
            </span>
          </div>
        </div>

        <div>
          <label htmlFor="link" className="sr-only">
            Link to song
          </label>

          <div className="input">
            <input type="url" placeholder="Link to song" />
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
