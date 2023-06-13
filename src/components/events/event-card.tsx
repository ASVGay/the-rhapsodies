import React from 'react';
import Image from "next/image"
import AttendanceCard from "@/components/events/attendance-card";
import {ClockIcon, CalendarIcon, MapPinIcon} from "@heroicons/react/24/outline";

const EventCard = () => {
    enum EventType {
        BrainstormBorrel,
        Rehearsal,
    }

    const EventCardImage = (path: string) => {
        return (
            <Image
                style={{
                objectFit: "cover",
                height: "120px",
                width: "100%",
                objectPosition: "bottom"
            }}
                   src={path}
                   alt={"Brainstorm Image"}
                   width={358}
                   height={121}/>
        )
    }

    const getEventImage = (eventType: EventType) => {
        switch (eventType) {
            case EventType.BrainstormBorrel:
                return EventCardImage("https://res.cloudinary.com/dzpeu56zp/image/upload/v1686318105/event-banners/brainstorm.jpg")
            case EventType.Rehearsal:
                return EventCardImage("https://res.cloudinary.com/dzpeu56zp/image/upload/v1686318116/event-banners/rehearsal.jpg")
        }
    }
    return (
        <div className="w-[22rem] h-fit cursor-pointer rounded-md bg-white drop-shadow-lg overflow-hidden">
            <div className="h-1/2 w-full">
                {getEventImage(EventType.BrainstormBorrel)}
            </div>
            <div className={"flex flex-col p-2 gap-1"}>
                <div className={"flex flex-row justify-between gap-0.5"}>
                    <span className={"text-lg leading-8"}>Brainstormborrel</span>
                    <AttendanceCard/>
                </div>
                <div className={"flex flex-col"}>
                    <div className={"flex flex-row gap-2"}>
                        <CalendarIcon height={20} width={20} color={"#EEC73F"}/>
                        <span className={"text-base leading-5 text-zinc-400"}>Wednesday, June 14</span>
                    </div>
                    <div className={"flex flex-row gap-2"}>
                        <ClockIcon height={20} width={20} color={"#EEC73F"}/>
                        <span className={"text-base leading-5 text-zinc-400"}>12:45-16:00</span>
                    </div>
                    <div className={"flex flex-row gap-2"}>
                        <MapPinIcon height={20} width={20} color={"#EEC73F"}/>
                        <span className={"text-base leading-5 text-zinc-400"}>Rewind Music Studio</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventCard;