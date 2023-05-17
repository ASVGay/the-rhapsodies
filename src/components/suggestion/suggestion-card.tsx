import { MusicalNoteIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import { Instruments } from "@/constants/instruments"
import { ISuggestion } from "@/interfaces/suggestion"
import Link from "next/link"
import ProgressionBar from "@/components/suggestion/progression-bar"

interface SuggestionCardProps {
  suggestion: ISuggestion
}

const SuggestionCard = ({ suggestion }: SuggestionCardProps) => {
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
          <p className={"line-clamp-1"}>{suggestion.artists.join(", ")}</p>
          <p className={"line-clamp-3 h-12 text-sm font-medium leading-4 text-gray-400"}>
            {suggestion.motivation}
          </p>
        </span>
      </div>
      <div className={"rounded-md bg-neutral-100 p-3"}>
        <ProgressionBar roles={suggestion.roles} />
        <div className={"ml-auto mr-auto pl-8 pr-8"}>
          <div className={"flex justify-around"}>
            {suggestion.roles.map((role, index) => {
              return (
                <Image
                  key={index}
                  src={Instruments[role.instrument].icon}
                  alt={role.instrument.toString()}
                  width={24}
                  height={24}
                  className={role.filledBy?.length ? "" : "opacity-30"}
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
