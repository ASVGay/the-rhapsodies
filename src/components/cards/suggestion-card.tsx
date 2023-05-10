import { MusicalNoteIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import { Instruments } from "@/constants/instruments"
import { ISuggestion } from "@/interfaces/suggestion"

interface SuggestionCardProps {
  suggestion: ISuggestion
}

const SuggestionCard = ({ suggestion }: SuggestionCardProps) => {
  const rolesFilled = () => {
    return suggestion.roles.filter((role) => role.filledBy != null).length
  }

  const progressionFraction = `${rolesFilled()}/${suggestion.roles.length}`
  const progressionBarWidth = (rolesFilled() / suggestion.roles.length) * 100 + "%"

  return (
    <div className={"w-[22rem] rounded-md bg-neutral-50 drop-shadow-lg"}>
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
        <div className={"flex items-center justify-between"}>
          <div className={"h-2 w-full rounded-md bg-green-200"}>
            <div className={`h-2 rounded-md bg-green-400`} style={{ width: progressionBarWidth }} />
          </div>
          <p className={"ml-4 text-sm font-light text-gray-400"}>{progressionFraction}</p>
        </div>
        <div className={"ml-auto mr-auto pl-8 pr-8"}>
          <div className={"flex justify-around"}>
            {suggestion.roles.map((value, index) => {
              return (
                <Image
                  key={index}
                  src={Instruments[value.instrument].icon}
                  alt={value.instrument.toString()}
                  width={24}
                  height={24}
                  className={value.filledBy ?? "opacity-30"}
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
