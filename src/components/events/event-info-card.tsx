import React from "react"
import { getEventDate, getEventImage, getEventTime, getEventTitle } from "@/helpers/event.helper"
import { CalendarIcon, ClockIcon, MapPinIcon } from "@heroicons/react/24/outline"
import { Event } from "@/types/database-types"
import Image from "next/image"

interface EventInfoCardProps {
  event: Event
}

const EventInfoCard = ({ event }: EventInfoCardProps) => {
  const title = getEventTitle(event.event_type)

  return (
    <div>
      <div className={"relative h-32 w-full text-center"}>
        <Image
          src={getEventImage(event.event_type)}
          alt={`Background image ${title}`}
          fill={true}
          className={"rounded-lg object-cover brightness-30 filter"}
          placeholder={"blur"}
          blurDataURL={
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNMT0+uBwAEIAGyKWedwwAAAABJRU5ErkJggg=="
          }
        />
        <div className="absolute left-1/2 top-1/2 w-max -translate-x-1/2 -translate-y-1/2 text-neutral-200">
          <p data-cy={"event-title"} className={"text-lg font-bold text-white"}>
            {title}
          </p>
          <p data-cy={"event-date"} className={"info-item"}>
            <CalendarIcon />
            {getEventDate(event.start_time)}
          </p>
          <p data-cy={"event-time"} className={"info-item"}>
            <ClockIcon />
            {getEventTime(event.start_time, event.end_time)}
          </p>
          <p data-cy={"event-location"} className={"info-item"}>
            <MapPinIcon />
            {event.location}
          </p>
        </div>
      </div>
    </div>
  )
}

export default EventInfoCard
