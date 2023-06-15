import { SupabaseClient } from "@supabase/supabase-js"
import { Database } from "@/types/database"

export const getEvent = (supabase: SupabaseClient<Database>, id: string) => {
  return supabase.from("event").select("*").eq("id", id).single()
}

export const getAttendance = (
  supabase: SupabaseClient<Database>,
  eventId: string,
  memberId: string
) => {
  return supabase
    .from("attendee")
    .select("attending")
    .eq("event_id", eventId)
    .eq("member_id", memberId)
}
