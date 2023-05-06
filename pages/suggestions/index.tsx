import { FC } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import SuggestionCard from "@/components/cards/SuggestionCard";
import { Instruments } from "@/constants/Instruments";

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

        {/*TODO: db-connection*/}
        <div className={"flex flex-col items-center lg:flex-row lg:flex-wrap lg:justify-center space-x-4"}>
            <SuggestionCard
                title={"Example Song Title 1"}
                artists={["Example Artist"]}
                motivation={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque doloribus est eum excepturi inventore laboriosam magni minima nesciunt, odio quasi."}
                roles={[
                    { instrument: Instruments.SINGER, filledBy: {username: "Rens"} },
                    { instrument: Instruments.ACCORDION, filledBy: {username: "Kevin"} },
                    { instrument: Instruments.SINGER, filledBy: undefined },
                    { instrument: Instruments.BASS_GUITAR, filledBy: undefined },
                    { instrument: Instruments.BASS_GUITAR, filledBy: undefined },
                    { instrument: Instruments.BANJO, filledBy: {username: "Kevin"} },
                ]}
            />
        </div>
    </>
}

export default Suggestions;
