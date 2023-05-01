import { FC } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import SuggestionCard from "@/components/cards/SuggestionCard";
import { Instruments } from "@/data/instruments/Instruments";

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
        {/*TODO: responsiveness for desktop*/}
        <div className={"flex flex-col items-center lg:flex-row lg:flex-wrap lg:justify-center space-x-4"}>
            <SuggestionCard
                title={"Example Song Title 1"}
                artists={["Example Artist"]}
                motivation={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque doloribus est eum excepturi inventore laboriosam magni minima nesciunt, odio quasi."}
                roles={[
                    { instrument: Instruments.SINGER, filledBy: undefined },
                    { instrument: Instruments.ACCORDION, filledBy: undefined },
                    { instrument: Instruments.SINGER, filledBy: undefined },
                    { instrument: Instruments.BASS_GUITAR, filledBy: undefined },
                    { instrument: Instruments.BASS_GUITAR, filledBy: undefined },
                    { instrument: Instruments.BANJO, filledBy: undefined },
                ]}
            />
        </div>
    </>
}

export default Suggestions;
