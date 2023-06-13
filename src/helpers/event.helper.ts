import { EventType } from "@/types/database-types"

export const getTitle = (eventType: EventType) => {
  switch (eventType) {
    case "brainstormborrel":
      return "Brainstormborrel"
    case "rehearsal":
      return "Rehearsal"
  }
}
