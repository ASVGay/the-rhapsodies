import React from "react"
import Image from "next/image"
import { Event } from "@/types/database-types"
import AttendanceCard from "@/components/events/attendance-card"
import { ClockIcon, MapPinIcon } from "@heroicons/react/24/outline"
import {  CalendarIcon } from "@heroicons/react/24/solid"
import {DayMapper, MonthMapper} from "@/enums/event.enum";
import {getEventImage} from "@/helpers/event.helper";
import {format} from "date-fns";

interface EventCardProps {
  event: Event
}
const EventCard = ({ event }: EventCardProps) => {
  return (
    <div className="h-fit w-[22rem] cursor-pointer overflow-hidden rounded-md bg-white drop-shadow-lg">
      <div className="w-full pb-1">
        <Image className={"object-cover h-[120px]"} src={getEventImage(event.event_type)} alt={"Event Image"} width={358} height={121}/>
      </div>
      <div className={"flex flex-col p-2"}>
        <div className={"flex flex-row justify-between gap-1"}>
          <span className={"text-lg leading-8 font-medium"}>{event.event_type}</span>
          <AttendanceCard attendees={event.attendees} />
        </div>
        <div className={"flex flex-col"}>
          <div className={"flex flex-row gap-2"}>
            <CalendarIcon height={20} width={20} color={"#EEC73F"} />
            <span className={"text-base leading-5 font-light text-zinc-400"}>
               {format(new Date(event.start_time), "cccc, LLLL d")}
            </span>
          </div>
          <div className={"flex flex-row gap-2"}>
            <ClockIcon height={20} width={20} color={"#EEC73F"} />
            <span className={"text-base leading-5 font-light text-zinc-400"}>
              {format(new Date(event.start_time), "HH:mm")} -{" "}
              {format(new Date(event.end_time), "HH:mm")}
            </span>
          </div>
          <div className={"flex flex-row gap-2"}>
            <MapPinIcon height={20} width={20} color={"#EEC73F"} />
            <span className={"text-base leading-5 font-light  text-zinc-400"} >{event.location}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventCard
