import { EventType } from "@/types/database-types"
import { format, parse } from "date-fns"

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

export const getEventDateFormatted = (date: Date) => {
  return format(new Date(date), "cccc, LLLL d")
}

export const getEventTime = (startTime: string, endTime: string) => {
  return `${getEventTimeInHoursMinutes(startTime)} - ${getEventTimeInHoursMinutes(endTime)}`
}

export const getEventTimeInHoursMinutes = (startTime: string) => {
  return format(new Date(startTime), "HH:mm")
}

export const getAllTimeSlots = () => {
  const timeSlots = []
  let hours = 0
  let minutes = 0

  for (let i = 0; i < 96; i++) {
    const formattedHours = hours.toString().padStart(2, "0")
    const formattedMinutes = minutes.toString().padStart(2, "0")
    const timeSlot = `${formattedHours}:${formattedMinutes}`
    timeSlots.push(timeSlot)

    minutes += 15

    if (minutes === 60) {
      hours++
      minutes = 0
    }
  }
  return timeSlots
}

export const parseStartAndEndDate = (startTime: string, endTime: string, date: Date) => {
  const startDateTime = parse(startTime, "HH:mm", date).toISOString()
  const endDateTime = parse(endTime, "HH:mm", date).toISOString()

  return { startDateTime: startDateTime, endDateTime: endDateTime }
}
