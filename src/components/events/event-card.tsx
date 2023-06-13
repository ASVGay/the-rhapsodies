import React from "react"
import Image from "next/image"
import { Event } from "@/types/database-types"
import AttendanceCard from "@/components/events/attendance-card"
import { ClockIcon, MapPinIcon } from "@heroicons/react/24/outline"
import {  CalendarIcon } from "@heroicons/react/24/solid"
import {DayMapper, MonthMapper} from "@/enums/event.enum";
import {getEventImage} from "@/helpers/event.helper";

interface EventCardProps {
  event: Event
}
const EventCard = ({ event }: EventCardProps) => {
  const getDayAndMonth = (timestamp: string) => {
    const date = new Date(timestamp)
    return `${DayMapper[date.getDay()]}, ${MonthMapper[date.getMonth()]} ${date.getDate()}`
  }

  const getStartAndEndTime = (startTimeStamp: string, endTimeStamp: string | null) => {
    let endDate
    const startDate = new Date(startTimeStamp)
    const startDateTime = startDate.getHours() + ":" + startDate.getMinutes()

    if (endTimeStamp != null) {
      endDate = new Date(endTimeStamp)
      const endDateTime = endDate.getHours() + ":" + endDate.getMinutes()
      return `${startDateTime} - ${endDateTime}`
    }

    return startDateTime
  }

  return (
    <div className="h-fit w-[22rem] cursor-pointer overflow-hidden rounded-md bg-white drop-shadow-lg">
      <div className="w-full pb-1">
        <Image className={"object-cover object-bottom h-[120px]"} src={getEventImage(event.event_type)} alt={"Event Image"} width={358} height={121}/>
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
              {getDayAndMonth(event.start_time)}
            </span>
          </div>
          <div className={"flex flex-row gap-2"}>
            <ClockIcon height={20} width={20} color={"#EEC73F"} />
            <span className={"text-base leading-5 font-light text-zinc-400"}>
              {getStartAndEndTime(event.start_time, event.end_time)}
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
