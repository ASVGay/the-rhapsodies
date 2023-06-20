import PreviewPlayer from "@/components/images/preview-player"
import { MusicalNoteIcon } from "@heroicons/react/24/solid"
import React from "react"

export interface SongPreviewImageProps {
  previewUrl: string | null
  imageUrl: string | null
}

const SongPreviewImage = ({ previewUrl, imageUrl }: SongPreviewImageProps) => {
  return (
    <div className={"my-auto flex bg-neutral-200 rounded-md relative"}>
      {previewUrl
        ? <PreviewPlayer
          url={previewUrl}
          color={imageUrl ? "text-white" : "text-black"}
        />
        : <MusicalNoteIcon className={"p-2"} width={64} height={64} />
      }
      {imageUrl &&
        <img
          src={imageUrl}
          height={64} width={64}
          alt={"song image"}
          className={"rounded-md my-auto absolute"}
        />
      }
    </div>
  )
}

export default SongPreviewImage