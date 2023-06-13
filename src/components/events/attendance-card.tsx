import React from 'react';
import {CheckCircleIcon, QuestionMarkCircleIcon, XCircleIcon} from "@heroicons/react/24/solid";

const AttendanceCard = () => {
    const data = {
        isAttending: 3,
        isNotAttending: 5,
        noInfo: 10
    }
    return (
        <div className={"w-fit h-[1.75rem] color bg-zinc-100 rounded flex flex-row justify-between items-center gap-1 pr-2 pl-2"}>
            <CheckCircleIcon height={20} width={20} color={"#4ADE80"}/>
            <span className={"text-sm"}>{data.isAttending}</span>
            <XCircleIcon height={20} width={20} color={"#F87171"}/>
            <span className={"text-sm"}>{data.isNotAttending}</span>
            <QuestionMarkCircleIcon height={20} width={20} color={"#FDBA74"}/>
            <span className={"text-sm"}>{data.noInfo}</span>
        </div>
    );
};

export default AttendanceCard;