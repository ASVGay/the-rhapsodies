import { MusicalNoteIcon } from "@heroicons/react/24/solid"
import React from "react"

export interface SongImageProps {
  url: string | null
}

const SongImage = ({ url }: SongImageProps) => {
  return <>
    {url
      ? <img
        src={url}
        height={64} width={64}
        alt={`song image`}
        className={"rounded-md my-auto"}
      />
      : <div className={"my-auto flex"}>
        <MusicalNoteIcon
          className={"rounded-md bg-neutral-200 p-2 text-black"}
          width={64} height={64}
        />
      </div>
    }
  </>
}

export default SongImage