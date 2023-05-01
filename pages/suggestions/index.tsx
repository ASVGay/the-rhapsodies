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
        <div className={"flex flex-col items-center"}>
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
            <SuggestionCard
                title={"Example Song Title 2"}
                artists={["Example Artist"]}
                motivation={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos eos magnam nobis tenetur. Asperiores aut autem consequatur culpa delectus dolorem eos hic ipsam magnam natus necessitatibus non numquam odio pariatur qui saepe sed similique vitae, voluptate voluptatibus. Blanditiis culpa, explicabo labore quae quo repellendus soluta! Dignissimos dolorem mollitia nihil tempora."}
                roles={[
                    { instrument: Instruments.SINGER, filledBy: undefined },
                    { instrument: Instruments.SINGER, filledBy: undefined },
                ]}
            />
        </div>
    </>
}

export default Suggestions;
