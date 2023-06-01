import { MusicalNoteIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import Link from "next/link"
import ProgressionBar from "@/components/suggestion/progression-bar"
import { Suggestion } from "@/types/database-types"
import { getInstrumentImage } from "@/helpers/cloudinary.helper"


const SuggestionCard = (suggestion : Suggestion) => {
  return (
    <Link
      href={{ pathname: "/suggestions/[suggestion]", query: { suggestion: suggestion.id } }}
      className={"w-[22rem] rounded-md bg-neutral-50 drop-shadow-lg"}
      data-cy="suggestion-card"
    >
      <div className={"flex items-start p-3"}>
        <div className={"mb-auto mt-auto flex"}>
          <MusicalNoteIcon className={"h-14 w-14 rounded-md bg-neutral-200 p-2 text-black"} />
        </div>
        <span className={"pl-3"}>
          <p className={"line-clamp-1 font-bold"}>{suggestion.title}</p>
          <p className={"line-clamp-1"}>{suggestion.artist?.join(", ")}</p>
          <p className={"line-clamp-3 h-12 text-sm font-medium leading-4 text-gray-400"}>
            {suggestion.motivation}
          </p>
        </span>
      </div>
      <div className={"rounded-md bg-neutral-100 p-3"}>
        {suggestion.suggestion_instruments && (
          <ProgressionBar suggestionInstruments={suggestion.suggestion_instruments} />
        )}
        <div className={"ml-auto mr-auto pl-8 pr-8"}>
          <div className={"flex justify-around"}>
            {suggestion.suggestion_instruments?.map((suggestion_instrument) => {
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
    </Link>
  )
}

export default SuggestionCard
