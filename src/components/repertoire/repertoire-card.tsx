import React from "react"
import { Suggestion } from "@/types/database-types"
import { MusicalNoteIcon } from "@heroicons/react/24/solid"
import Image from "next/image";

const RepertoireCard = (song: Suggestion) => {

  const checkEmptyDivision = () => {
    for (const item of song.song_instruments) {
      if (item.division.length === 0) return true
    }
    return false
  }
  return (
    <div className={"w-[22rem] rounded-md bg-neutral-50 drop-shadow-lg cursor-pointer"} key={song.id}>
      <div className={"m-2 flex"}>
        <div className={"mb-auto mt-auto flex w-full justify-between"}>
          <div className={"flex gap-2"}>
            <div className={"mb-auto mt-auto flex"}>
              <MusicalNoteIcon className={"h-14 w-14 rounded-md bg-neutral-200 p-2 text-black"} />
            </div>
            <div className={"flex flex-col justify-center"}>
              <p className={"line-clamp-1 font-bold"}>{song.title}</p>
              <p className={"line-clamp-1"}>{song.artist}</p>
            </div>
          </div>
          {
            checkEmptyDivision() &&
              <Image src={"/icons/exclaimation-circle.svg"} alt={"Exclaimation circle"} height={24} width={24}/>
          }
        </div>
      </div>
    </div>
  )
}

export default RepertoireCard
