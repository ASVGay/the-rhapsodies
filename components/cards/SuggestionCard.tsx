import { MusicalNoteIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { Instruments } from "@/constants/Instruments.constant";
import { ISuggestion } from "@/interfaces/Suggestion";
import Link from "next/link";

interface SuggestionCardProps {
    suggestion: ISuggestion
}

const SuggestionCard = ({suggestion}: SuggestionCardProps)  => {

    const rolesFilled = () => {
        return suggestion.roles.filter((role) => role.filledBy != null).length
    }

    const progressionFraction = `${rolesFilled()}/${suggestion.roles.length}`
    const progressionBarWidth = ((rolesFilled() / suggestion.roles.length) * 100) + "%"

    return (
        <Link
            href={{ pathname: "/suggestion/[suggestion]", query: { suggestion: "example" } }}
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
                <div className={"flex justify-between items-center"}>
                    <div className={"bg-green-200 w-full h-2 rounded-md"}>
                        <div className={`bg-green-400 h-2 rounded-md`} style={{ width: progressionBarWidth }}/>
                    </div>
                    <p className={"ml-4 text-gray-400 text-sm font-light"}>{progressionFraction}</p>
                </div>
                <div className={"ml-auto mr-auto pl-8 pr-8"}>
                    <div className={"flex justify-around"}>
                        {suggestion.roles.map((value, index) => {
                            return <Image
                                key={index}
                                src={Instruments[value.instrument].icon}
                                alt={value.instrument.toString()}
                                width={24} height={24}
                                className={value.filledBy ?? "opacity-30"}
                            />
                        })}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default SuggestionCard