import { FC, useEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import SuggestionCard from "@/components/cards/SuggestionCard";
import { Instruments } from "@/constants/Instruments";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";

// TODO: use user ref in db instead of string

const Suggestions: FC = () => {
    const [suggestions, setSuggestions] = useState([])

    //TODO: when should data be fetched?
    //TODO move to API
    const fetchData = async () => {
        const data = []
        const querySnapshot = await getDocs(collection(db, "suggestions"));
        querySnapshot.forEach((doc) => {
            data.push(doc.data())
        });
        setSuggestions(data)
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

        {/*TODO: db-connection*/}
        <div className={"flex flex-col items-center lg:flex-row lg:flex-wrap lg:justify-center space-x-4"}>
            {suggestions.map((value, index) =>
                <SuggestionCard
                    key={index}
                    title={value.title}
                    artists={value.artists}
                    motivation={value.motivation}
                    roles={value.roles.map(i => {
                        return { instrument: Instruments[i.instrument], filledBy: i.filledBy }
                    })}/>
            )}
        </div>
    </>
}

export default Suggestions;
