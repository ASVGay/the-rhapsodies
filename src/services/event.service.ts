import { SupabaseClient } from "@supabase/supabase-js"
import { Database } from "@/types/database"
import { Attending } from "@/types/database-types"
import {IEvent} from "@/interfaces/event";

export const getEvent = (supabase: SupabaseClient<Database>, id: string) => {
  return supabase.from("event").select("*").eq("id", id).single()
}

export const getEventsWithAttendees = async (supabase: SupabaseClient<Database>) => {
  return supabase.rpc("get_events_with_attendance")
}

export const createEvent = (supabase: SupabaseClient<Database>, {endTime, startTime, eventType, location}: IEvent) => {
    return supabase
        .from("event")
        .insert({
            end_time: endTime,
            start_time: startTime,
            event_type: eventType,
            location: location,
        })
        .select()
        .single()
}

export const getAttendingMembersForEvent = (
  supabase: SupabaseClient<Database>,
  eventId: string
) => {
  return supabase.rpc("get_members_by_event", { event_id: eventId })
}

export const getAttendanceForEventOfUser = (
  supabase: SupabaseClient<Database>,
  eventId: string,
  memberId: string
) => {
  return supabase
    .from("attendee")
    .select("attending")
    .eq("event_id", eventId)
    .eq("member_id", memberId)
    .maybeSingle()
}

export const updateAttendance = (
  supabase: SupabaseClient<Database>,
  eventId: string,
  memberId: string,
  attending: Attending
) => {
  return supabase
    .from("attendee")
    .upsert({ event_id: eventId, member_id: memberId, attending })
    .select("attending")
    .single()
}

export const createAttendeeChannel = (supabase: SupabaseClient<Database>, callback: () => void) => {
  return supabase
    .channel("realtime attendee")
    .on("postgres_changes", { event: "*", schema: "public", table: "attendee" }, () => {
      callback()
    })
    .subscribe()
}
