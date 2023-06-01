import React from 'react';
import {Suggestion} from "@/types/database-types";

const RepertoireCard = (suggestion : Suggestion) => {
    return (
        <div className={"w-[22rem] h-12 rounded-md bg-neutral-50 drop-shadow-lg"}>
            <h1>{suggestion.title}</h1>
        </div>
    );
};

export default RepertoireCard;