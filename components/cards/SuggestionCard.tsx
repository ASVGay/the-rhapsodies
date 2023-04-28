import { MusicalNoteIcon } from "@heroicons/react/24/solid";

interface SuggestionCardProps {
    title: string,
    artists: string[],
    motivation: string,
    instruments: string[]
}

const SuggestionCard = (props: SuggestionCardProps) => {
    return (
        <div className={"ml-4 mr-4 mb-8 bg-neutral-50 rounded drop-shadow-lg"}>
            <div className={"flex p-3"}>
                <div className={"flex m-auto"}>
                    <MusicalNoteIcon className={"w-14 h-14 p-2 text-black rounded bg-neutral-200"}/>
                </div>
                <span className={"pl-3"}>
                        <p className={"font-bold"}>{props.title}</p>
                        <p>{props.artists}</p>
                        <p className={"text-sm leading-4 font-medium text-gray-400 overflow-hidden h-12"}>
                           {props.motivation}
                        </p>
                    </span>
            </div>
            <div className={"bg-neutral-100 rounded p-3"}>
                <div className={"flex justify-between"}>
                    <div>progression-bar</div>
                    <p>0/{props.instruments.length}</p>
                </div>
                <div className={"ml-auto mr-auto pl-8 pr-8"}>
                    <div className={"flex justify-around"}>
                        {props.instruments.map((value, index) => {
                            return <p key={index}>{value}</p>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SuggestionCard