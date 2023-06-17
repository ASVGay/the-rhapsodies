import React from "react"
import Image from "next/image"
import { Event } from "@/types/database-types"
import AttendanceCard from "@/components/events/attendance-card"
import { ClockIcon, MapPinIcon } from "@heroicons/react/24/outline"
import {  CalendarIcon } from "@heroicons/react/24/solid"
import {getEventDate, getEventImage, getEventTime, getEventTitle} from "@/helpers/event.helper";
import {format} from "date-fns";
import {useRouter} from "next/router";

interface EventCardProps {
  event: Event,
  setShowSpinner: React.Dispatch<React.SetStateAction<boolean>>}
const EventCard = ({ event, setShowSpinner }: EventCardProps) => {
  const router = useRouter()
  return (
    <div className="h-fit w-[22rem] cursor-pointer overflow-hidden rounded-md bg-white drop-shadow-lg" onClick={() => {
      setShowSpinner(true)
      router.push({ pathname: "/events/[event]", query: { event: event.id } })
    }}>
      <div className="w-full pb-1">
        <Image className={"object-cover h-[120px]"} src={getEventImage(event.event_type)} alt={"Event Image"} width={358} height={121}/>
      </div>
      <div className={"flex flex-col p-2"}>
        <div className={"flex flex-row justify-between gap-1"}>
          <span className={"text-lg leading-8 font-medium"}>{getEventTitle(event.event_type)}</span>
          <AttendanceCard attendees={event.attendees} />
        </div>
        <div className={"flex flex-col"}>
          <div className={"flex flex-row gap-2"}>
            <CalendarIcon height={20} width={20} color={"#EEC73F"} />
            <span className={"text-base leading-5 font-light text-zinc-400"}>
               {getEventDate(event.start_time)}
            </span>
          </div>
          <div className={"flex flex-row gap-2"}>
            <ClockIcon height={20} width={20} color={"#EEC73F"} />
            <span className={"text-base leading-5 font-light text-zinc-400"}>
              {getEventTime(event.start_time, event.end_time)}
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
