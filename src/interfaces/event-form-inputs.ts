import { EventType } from "@/types/database-types"

export interface EventFormInputs {
  eventType: EventType
  eventDate: Date
  startTime: string
  endTime: string
  location: string
}
