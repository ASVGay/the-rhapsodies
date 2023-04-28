import { FC } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import SuggestionCard from "@/components/cards/SuggestionCard";

const Suggestions: FC = () => {
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

        <div className={"flex flex-col justify-center"}>
            <SuggestionCard
                title={"Example Song Title 1"}
                artists={["Example Artist"]}
                motivation={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque doloribus est eum excepturi inventore laboriosam magni minima nesciunt, odio quasi."}
                instruments={["Guitar", "Drums", "Drums", "Singer"]}
            />
            <SuggestionCard
                title={"Example Song Title 2"}
                artists={["Example Artist"]}
                motivation={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque doloribus est eum excepturi inventore laboriosam magni minima nesciunt, odio quasi."}
                instruments={["Guitar", "Drums", "Drums", "Singer"]}
            />
        </div>
    </>
}

export default Suggestions;
