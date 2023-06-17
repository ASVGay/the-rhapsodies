import { EventType } from "@/types/database-types"
import { format } from "date-fns"

export const getEventTitle = (eventType: EventType) => {
  switch (eventType) {
    case "brainstormborrel":
      return "Brainstormborrel"
    case "rehearsal":
      return "Rehearsal"
  }
}

export const getEventImage = (eventType: EventType) => {
  return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/v1686318116/event-banners/${eventType}.png`
}

export const getEventDate = (startTime: string) => {
  return format(new Date(startTime), "cccc, LLLL d")
}

export const getEventTime = (startTime: string, endTime: string) => {
  return `${format(new Date(startTime), "HH:mm")} - ${format(new Date(endTime), "HH:mm")}`
}
