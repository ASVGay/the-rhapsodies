import { MusicalNoteIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { Instruments } from "@/constants/Instruments.constant";
import { ISuggestion } from "@/interfaces/Suggestion";
import Link from "next/link";
import ProgressionBar from "@/components/suggestion/progressionBar";

interface SuggestionCardProps {
  suggestion: ISuggestion
}

const SuggestionCard = ({ suggestion }: SuggestionCardProps) => {
  return (
    <Link
      href={{ pathname: "/suggestion/[suggestion]", query: { suggestion: suggestion.id } }}
      className={"bg-neutral-50 rounded-md drop-shadow-lg w-[22rem]"}>
      <div className={"flex items-start p-3"}>
        <div className={"flex mt-auto mb-auto"}>
          <MusicalNoteIcon className={"w-14 h-14 p-2 text-black rounded-md bg-neutral-200"}/>
        </div>
        <span className={"pl-3"}>
                        <p className={"font-bold line-clamp-1"}>{suggestion.title}</p>
                        <p className={"line-clamp-1"}>{suggestion.artists.join(', ')}</p>
                        <p className={"text-sm leading-4 font-medium text-gray-400 h-12 line-clamp-3"}>
                            {suggestion.motivation}
                        </p>
                </span>
      </div>
      <div className={"bg-neutral-100 rounded-md p-3"}>
        <ProgressionBar roles={suggestion.roles}/>
        <div className={"ml-auto mr-auto pl-8 pr-8"}>
          <div className={"flex justify-around"}>
            {suggestion.roles.map((role, index) => {
              return <Image
                key={index}
                src={Instruments[role.instrument].icon}
                alt={role.instrument.toString()}
                width={24} height={24}
                className={role.filledBy ?? "opacity-30"}
              />
            })}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default SuggestionCard