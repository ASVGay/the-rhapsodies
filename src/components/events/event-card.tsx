import React from "react"
import Image from "next/image"
import { EventWithAttendance } from "@/types/database-types"
import AttendanceCard from "@/components/events/attendance-card"
import { ClockIcon, MapPinIcon } from "@heroicons/react/24/outline"
import { CalendarIcon } from "@heroicons/react/24/solid"
import { getEventDate, getEventImage, getEventTime, getEventTitle } from "@/helpers/event.helper"
import { useRouter } from "next/router"

interface EventCardProps {
  event: EventWithAttendance
  setShowSpinner: React.Dispatch<React.SetStateAction<boolean>>
}

const EventCard = ({ event, setShowSpinner }: EventCardProps) => {
  const router = useRouter()

  return (
    <div
      className="h-fit w-88 cursor-pointer overflow-hidden rounded-md bg-white shadow-sm"
      onClick={() => {
        setShowSpinner(true)
        router.push({ pathname: "/events/[event]", query: { event: event.id } })
      }}
    >
      <div className="w-full pb-1">
        <Image
          className={"h-[120px] object-cover"}
          src={getEventImage(event.event_type)}
          alt={"Event Image"}
          width={358}
          height={121}
        />
      </div>
      <div className={"flex flex-col p-2"}>
        <div className={"flex flex-row justify-between gap-1"}>
          <span className={"text-lg font-medium leading-8"}>{getEventTitle(event.event_type)}</span>
          <AttendanceCard
            present={event.present}
            absent={event.absent}
            undecided={event.undecided}
          />
        </div>
        <div className={"flex flex-col"}>
          <div className={"flex flex-row gap-2"}>
            <CalendarIcon height={20} width={20} color={"#EEC73F"} />
            <span className={"text-base font-light leading-5 text-zinc-400"}>
              {getEventDate(event.start_time)}
            </span>
          </div>
          <div className={"flex flex-row gap-2"}>
            <ClockIcon height={20} width={20} color={"#EEC73F"} />
            <span className={"text-base font-light leading-5 text-zinc-400"}>
              {getEventTime(event.start_time, event.end_time)}
            </span>
          </div>
          <div className={"flex flex-row gap-2"}>
            <MapPinIcon height={20} width={20} color={"#EEC73F"} />
            <span className={"text-base font-light leading-5  text-zinc-400"}>
              {event.location}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventCard
