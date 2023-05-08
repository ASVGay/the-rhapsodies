import { MusicalNoteIcon } from "@heroicons/react/24/solid";
import Image, { StaticImageData } from "next/image";
import { IUser } from "@/interfaces/User";

export interface Role {
    instrument: { instrument: string, icon: { readonly default: StaticImageData } },
    filledBy: IUser | undefined
}

interface SuggestionCardProps {
    title: string,
    artists: string[],
    motivation: string,
    roles: Role[]
}

const SuggestionCard = (props: SuggestionCardProps) => {

    const rolesFilled = () => {
        return props.roles.filter((role) => role.filledBy?.username != undefined).length
    }

    const progressionFraction = `${rolesFilled()}/${props.roles.length}`
    const progressionBarWidth = ((rolesFilled() / props.roles.length) * 100) + "%"

    return (
        <div className={"bg-neutral-50 rounded-md drop-shadow-lg w-[22rem]"}>
            <div className={"flex items-start p-3"}>
                <div className={"flex mt-auto mb-auto"}>
                    <MusicalNoteIcon className={"w-14 h-14 p-2 text-black rounded-md bg-neutral-200"}/>
                </div>
                <span className={"pl-3"}>
                        <p className={"font-bold line-clamp-1"}>{props.title}</p>
                        <p className={"line-clamp-1"}>{props.artists.join(', ')}</p>
                        <p className={"text-sm leading-4 font-medium text-gray-400 h-12 line-clamp-3"}>
                           {props.motivation}
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
                        {props.roles.map((value, index) => {
                            return <Image
                                src={value.instrument.icon}
                                alt={value.instrument.toString()}
                                key={index}
                                width={24} height={24}
                                className={value.filledBy?.username ?? "opacity-30"}
                            />
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SuggestionCard