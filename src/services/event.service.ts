import { SupabaseClient } from "@supabase/supabase-js"
import { Database } from "@/types/database"
import { Attending } from "@/types/database-types"

export const getEvent = (supabase: SupabaseClient<Database>, id: string) => {
  return supabase.from("event").select("*").eq("id", id).single()
}

export const getEventsWithAttendees = async (supabase: SupabaseClient<Database>) => {
  const currentTimestamp = new Date().toISOString()

  return supabase
    .from("event")
    .select(
      `
            *,
            attendees:attendee (
                "member_id",
                "attending"
            )
        `
    )
    .order("start_time")
    .gte("end_time", currentTimestamp)
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
