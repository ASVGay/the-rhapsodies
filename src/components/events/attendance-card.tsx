import React from 'react';
import {CheckCircleIcon, QuestionMarkCircleIcon, XCircleIcon} from "@heroicons/react/20/solid";
import {Attendee} from "@/types/database-types";

interface AttendanceCardProps {
    attendees: Attendee[]
}
const AttendanceCard = ({attendees}: AttendanceCardProps) => {
    const attendeeCount = {
        isAttending: attendees.filter((attendee) => {return attendee.attending === "present"}).length,
        isNotAttending: attendees.filter((attendee) => {return attendee.attending === "absent"}).length,
        noInfo: attendees.filter((attendee) => {return attendee.attending === "undecided"}).length
    }
    return (
        <div className={"max-w-[141px] w-[141px] color bg-zinc-100 rounded flex flex-row justify-between items-center pr-2 pl-2"}>
            <CheckCircleIcon height={20} width={20} color={"#4ADE80"}/>
            <span className={"text-sm leading-5 font-normal"}>{attendeeCount.isAttending}</span>
            <XCircleIcon height={20} width={20} color={"#F87171"}/>
            <span className={"text-sm leading-5 font-normal"}>{attendeeCount.isNotAttending}</span>
            <QuestionMarkCircleIcon height={20} width={20} color={"#FDBA74"}/>
            <span className={"text-sm leading-5 font-normal"}>{attendeeCount.noInfo}</span>
        </div>
    );
};

export default AttendanceCard;