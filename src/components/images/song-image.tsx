import { MusicalNoteIcon } from "@heroicons/react/24/solid"
import React from "react"
import Image from "next/image"

export interface SongImageProps {
  url: string | null
}

const SongImage = ({ url }: SongImageProps) => {
  return (
    <>
      {url ? (
        <Image src={url} height={64} width={64} alt={`Song Image`} />
      ) : (
        <div className={"my-auto flex"}>
          <MusicalNoteIcon
            className={"rounded-md bg-neutral-200 p-2 text-black"}
            width={64}
            height={64}
          />
        </div>
      )}
    </>
  )
}

export default SongImage
