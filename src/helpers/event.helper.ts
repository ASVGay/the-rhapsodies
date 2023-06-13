import { EventType } from "@/types/database-types"

export const getTitle = (eventType: EventType) => {
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
