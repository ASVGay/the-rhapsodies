import { SupabaseClient } from "@supabase/supabase-js"
import { Database } from "@/types/database"
import {Attending, InsertEvent} from "@/types/database-types"

export const getEvent = (supabase: SupabaseClient<Database>, id: string) => {
  return supabase.from("event").select("*").eq("id", id).single()
}

export const getEventsWithAttendees = async (supabase: SupabaseClient<Database>) => {
  return supabase.rpc("get_events_with_attendance")
}

export const createEvent = (supabase: SupabaseClient<Database>, {end_time, start_time, event_type, location}: InsertEvent) => {
    return supabase
        .from("event")
        .insert({
            end_time: end_time,
            start_time: start_time,
            event_type: event_type,
            location: location,
        })
        .select()
        .single()
}

export const deleteEvent = (supabase: SupabaseClient<Database>, eventId: string) => {
    return supabase.from("event").delete().eq("id", eventId)
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

export const setComment = (
  supabase: SupabaseClient<Database>,
  event_id: string,
  member_id: string,
  comment: string | null
) => {
  return supabase.from("attendee").upsert({ event_id, member_id, comment })
}

export const getComment = (
  supabase: SupabaseClient<Database>,
  event_id: string,
  member_id: string
) => {
  return supabase
    .from("attendee")
    .select("comment")
    .eq("event_id", event_id)
    .eq("member_id", member_id)
    .maybeSingle()
}
