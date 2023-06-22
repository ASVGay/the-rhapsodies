import { EventType } from "@/types/database-types"

export interface EventFormInputs {
  eventType: EventType
  eventDate: Date
  startDate: string
  endDate: string
  location: string
}
