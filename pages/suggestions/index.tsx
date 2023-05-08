import { FC, useEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import SuggestionCard from "@/components/cards/SuggestionCard";
import { Instruments } from "@/constants/Instruments";
import { getSuggestions } from "@/services/suggestions.service";
import { ISuggestion } from "@/interfaces/Suggestion";

const Suggestions: FC = () => {
    const [suggestions, setSuggestions] = useState<ISuggestion[]>([])

    const fetchData = async () => {
        setSuggestions(await getSuggestions())
    }

    useEffect(() => {
        fetchData()
    }, [])

    return <>
        <div className={"flex p-4 pt-6 pb-6 justify-between"}>
            <div className={"text-2xl leading-8 font-semibold"}>Suggestions</div>
            <div>
                <PlusIcon
                    className={"h-8 w-8 text-black"}
                    onClick={() => {
                    }}
                />
            </div>
        </div>

        <div className={"flex flex-col items-center lg:flex-row lg:flex-wrap lg:justify-center gap-6"}>
            {suggestions.map((value, index) =>
                <SuggestionCard
                    key={index}
                    title={value.title}
                    artists={value.artists}
                    motivation={value.motivation}
                    roles={value.roles.map(r => ({
                            instrument: Instruments[r.instrument],
                            filledBy: { username: r.filledBy }
                        })
                    )}/>
            )}
        </div>
    </>
}

export default Suggestions;
