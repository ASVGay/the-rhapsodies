import { FC, useEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import SuggestionCard from "@/components/suggestion/SuggestionCard";
import { getSuggestions } from "@/services/suggestions.service";
import { ISuggestion } from "@/interfaces/Suggestion";

const Suggestions: FC = () => {
    const [suggestions, setSuggestions] = useState<ISuggestion[]>([])

    useEffect(() => {
        getSuggestions().then(suggestions => setSuggestions(suggestions))
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
            {suggestions.map((suggestion, index) =>
                <SuggestionCard key={index} suggestion={suggestion}/>
            )}
        </div>
    </>
}

export default Suggestions
