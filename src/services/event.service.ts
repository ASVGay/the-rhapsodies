import {SupabaseClient} from "@supabase/supabase-js";
import {Database} from "@/types/database";

export const getEvents = async (supabase: SupabaseClient<Database>) => {
    return supabase
        .from('event')
        .select()
        .order('event_start_time');
}

export const getEventsWithAttendees = async (supabase: SupabaseClient<Database>) => {
    return supabase
        .from("event")
        .select(`
            *,
            attendees:attendee (
                "user_id",
                "attending"
            )
        `)
        .order('event_start_time');
}
export const getAttendees = async (supabase: SupabaseClient, eventId: string) => {
    return supabase
        .from("attendees")
        .select()
        .eq("event_id", eventId)
}