import PreviewPlayer from "@/components/images/preview-player"
import { MusicalNoteIcon } from "@heroicons/react/24/solid"
import React from "react"

export interface SongPreviewImageProps {
  previewUrl: string | null
  imageUrl: string | null
}

const SongPreviewImage = ({ previewUrl, imageUrl }: SongPreviewImageProps) => {
  return (
    <div className={"relative my-auto flex rounded-md bg-neutral-200"} data-cy="song-image-preview">
      {previewUrl ? (
        <PreviewPlayer url={previewUrl} color={imageUrl ? "text-white" : "text-black"} />
      ) : (
        <MusicalNoteIcon className={"p-2"} width={64} height={64} data-cy="no-sound" />
      )}
      {imageUrl && (
        <img
          src={imageUrl}
          height={64}
          width={64}
          alt={"song image"}
          className={"absolute my-auto rounded-md"}
          data-cy="song-image"
        />
      )}
    </div>
  )
}

export default SongPreviewImage
