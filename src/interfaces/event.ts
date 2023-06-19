import {EventType} from "@/types/database-types";

export interface IEvent {
    endTime: string,
    startTime: string,
    eventType: EventType,
    location: string
}