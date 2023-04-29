import { MusicalNoteIcon } from "@heroicons/react/24/solid";
import { Instrument } from "@/data/Instruments";

export interface Role {
    instrument: Instrument,
    filledBy: undefined //TODO: | user (id?/username)
}

interface SuggestionCardProps {
    title: string,
    artists: string[],
    motivation: string,
    roles: Role[]
}

const SuggestionCard = (props: SuggestionCardProps) => {

    const rolesFilled = () => {
        return props.roles.filter((role) => role.filledBy != undefined).length
    }

    return (
        <div className={"mb-8 bg-neutral-50 rounded-md drop-shadow-lg w-352"}>
            <div className={"flex p-3"}>
                <div className={"flex m-auto"}>
                    <MusicalNoteIcon className={"w-14 h-14 p-2 text-black rounded-md bg-neutral-200"}/>
                </div>
                <span className={"pl-3"}>
                        <p className={"font-bold"}>{props.title}</p>
                        <p>{props.artists}</p>
                        <p className={"text-sm leading-4 font-medium text-gray-400 h-12 line-clamp-3"}>
                           {props.motivation}
                        </p>
                    </span>
            </div>
            <div className={"bg-neutral-100 rounded-md p-3"}>
                <div className={"flex justify-between"}>
                    {/*TODO progression bar*/}
                    <div>progression-bar</div>
                    <p>{rolesFilled()}/{props.roles.length}</p>
                </div>
                <div className={"ml-auto mr-auto pl-8 pr-8"}>
                    <div className={"flex justify-around"}>
                        {/*TODO instrument icons*/}
                        {props.roles.map((value, index) => {
                            return <p key={index}>{value.instrument}</p>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SuggestionCard