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

export const getAllTimeSlots = () => {
  const timeSlots = []
  let hours = 0
  let minutes = 0

  for (let i = 0; i < 96; i++) {
    const formattedHours = hours.toString().padStart(2, "0")
    const formattedMinutes = minutes.toString().padStart(2, "0")
    const timeSlot = `${formattedHours}:${formattedMinutes}`
    timeSlots.push(timeSlot)

    // Increment minutes by 15
    minutes += 15

    // If minutes reach 60, increment hours and reset minutes to 0
    if (minutes === 60) {
      hours++
      minutes = 0
    }
  }

  return timeSlots
}
