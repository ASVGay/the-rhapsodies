import { EventType } from "@/types/database-types"
export const getEventImage = (eventType: EventType) => {
    return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/v1686318116/event-banners/${eventType}.png`
}