import Image from "next/image"
import ProgressionBar from "@/components/suggestion/progression-bar"
import { getInstrumentImage } from "@/helpers/cloudinary.helper"
import React from "react"
import { SongCardProps } from "@/interfaces/song-card-props"
import SongImage from "@/components/images/song-image"

const SuggestionCard = ({ song, router, setShowSpinner }: SongCardProps) => {
  return (
    <div
      onClick={async () => {
        setShowSpinner(true)
        await router.push({ pathname: "/suggestions/[suggestion]", query: { suggestion: song.id } })
      }}
      className={"w-[22rem] rounded-md bg-neutral-50 drop-shadow-lg"}
      data-cy="suggestion-card"
      data-id={song.id}
    >
      <div className={"flex items-start p-3"} key={song.id}>
        <SongImage url={song.image} />
        <span className={"pl-3"}>
          <p className={"line-clamp-1 font-bold"}>{song.title}</p>
          <p className={"line-clamp-1"}>{song.artist?.join(", ")}</p>
          {/*The max width is the width of the card minus the width of the image and padding */}
          <p
            className={
              "max-w-[calc(22rem-64px-calc(0.75rem*3))] line-clamp-3 h-12 text-sm font-medium leading-4 text-gray-400"
            }
          >
            {song.motivation}
          </p>
        </span>
      </div>
      <div className={"rounded-md bg-neutral-100 p-3"}>
        {song.song_instruments && <ProgressionBar suggestionInstruments={song.song_instruments} />}
        <div className={"ml-auto mr-auto pl-8 pr-8"}>
          <div className={"flex justify-around"}>
            {song.song_instruments?.map((suggestion_instrument) => {
              const { instrument, division } = suggestion_instrument
              return (
                <Image
                  key={suggestion_instrument.id}
                  src={getInstrumentImage(instrument.image_source)}
                  alt={instrument.instrument_name}
                  width={24}
                  height={24}
                  className={division.length == 0 ? "opacity-30" : ""}
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SuggestionCard
