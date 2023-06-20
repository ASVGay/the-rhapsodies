import React from "react"
import { MusicalNoteIcon } from "@heroicons/react/24/solid"
import { ExclamationCircleIcon } from "@heroicons/react/24/outline"
import { SongCardProps } from "@/interfaces/song-card-props"

const RepertoireCard = ({ song, setShowSpinner, router }: SongCardProps) => {
  const checkEmptyDivision = () => song.song_instruments.some((item) => item.division.length === 0)

  return (
    <div
      onClick={async () => {
        setShowSpinner(true)
        await router.push({ pathname: "/repertoire/[song]", query: { song: song.id } })
      }}
      className={"w-[22rem] cursor-pointer rounded-md bg-neutral-50 drop-shadow-lg"}
      key={song.id}
    >
      <div className={"m-2 flex"}>
        <div className={"mb-auto mt-auto flex w-full justify-between"}>
          <div className={"flex gap-2"}>
            {song.image
              ? <img
                src={song.image}
                height={64} width={64}
                alt={`${song.title} by ${song.artist}`}
                className={"rounded-md my-auto"}
              />
              : <div className={"mb-auto mt-auto flex"}>
                <MusicalNoteIcon className={"rounded-md bg-neutral-200 p-2 text-black"} width={64} height={64} />
              </div>
            }
            <div className={"flex flex-col justify-center"}>
              <p className={"line-clamp-1 font-bold"}>{song.title}</p>
              <p className={"line-clamp-1"}>{song.artist}</p>
            </div>
          </div>
          <div className="flex items-center">
            {checkEmptyDivision() && (
              <ExclamationCircleIcon
                data-cy={"exclamation-circle"}
                color={"red"}
                width={24}
                height={24}
                className={"flex align-bottom"}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RepertoireCard
