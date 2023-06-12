import React from 'react';
import Image from "next/image"
import AttendanceCard from "@/components/events/attendance-card";

const EventCard = () => {
    enum EventType {
        BrainstormBorrel,
        Rehearsal,
    }

    const EventCardImage = (path: string) => {
        return (
            <Image
                style={{
                position: "absolute",
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
                return EventCardImage("/images/events/brainstorm-borrel.png")
            case EventType.Rehearsal:
                return EventCardImage("/images/events/rehearsal.png")
        }
    }
    return (
        <div className="max-w-[22rem] h-[16rem] cursor-pointer rounded-md bg-neutral-50 drop-shadow-lg overflow-hidden">
            <div className="h-1/2 w-full">
                {getEventImage(EventType.BrainstormBorrel)}
            </div>
            <div className={"flex flex-col p-2"}>
                <div className={"flex flex-row justify-between gap-2"}>
                    <span className={"text-xl"}>Brainstormborrel</span>
                    <AttendanceCard/>
                </div>
            </div>
        </div>
    );
};

export default EventCard;